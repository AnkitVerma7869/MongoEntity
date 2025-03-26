import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Attribute, ConfigData, Entity } from "../../interfaces/types";
import { useEntitySetup } from '../../hooks/useEntitySetup';

// Props interface for EntitySetup component
interface EntitySetupProps {
  configData: ConfigData & {
    inputTypes: {
      [key: string]: {
        dataType: string;
        htmlType: string;
        options?: Array<{ value: string; label: string }>;
        min?: number;
        max?: number;
        step?: number;
        isDataTypeFixed?: boolean;
      }
    }
  };      
  entityName: string;              
  setEntityName: (name: string) => void;
  attributes: Attribute[];         
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  currentAttribute: Attribute;     
  setCurrentAttribute: (attribute: Attribute) => void;
  isCustomEntity: boolean;         
  setIsCustomEntity: (isCustom: boolean) => void;
  selectedEntity: string;          
  setSelectedEntity: (entity: string) => void;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleSaveEntity: (entity: Entity) => Promise<void>;
  resetForm: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

// Add index types constant
const INDEX_TYPES = {
  SINGLE_FIELD: 'single_field',
  COMPOUND: 'compound',
  UNIQUE: 'unique',
  TEXT: 'text',
  HASHED: 'hashed',
  GEOSPATIAL: 'geospatial',
  TTL: 'ttl'
};

export default function EntitySetup({
  configData,
  entityName,
  setEntityName,
  attributes,
  setAttributes,
  currentAttribute,
  setCurrentAttribute,
  isCustomEntity,
  setIsCustomEntity,
  selectedEntity,
  setSelectedEntity,
  editingIndex,
  setEditingIndex,
  handleSaveEntity,
  resetForm,
  showToast
}: EntitySetupProps) {
  const {
    errors,
    setErrors,
    handleEntitySelect: originalHandleEntitySelect,
    handleEntityNameChange,
    handleDefaultValueChange,
    handleValidationsChange,
    handleAddAttribute: originalHandleAddAttribute
  } = useEntitySetup({
    configData,
    entityName,
    setEntityName,
    attributes,
    setAttributes,
    currentAttribute,
    setCurrentAttribute,
    setIsCustomEntity,
    setSelectedEntity,
    editingIndex,
    setEditingIndex,
    showToast
  });

  const addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';
  const [selectedInputType, setSelectedInputType] = useState<string>('');
  const [inputOptions, setInputOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [newOption, setNewOption] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string | undefined }>({});
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isDataTypeDisabled, setIsDataTypeDisabled] = useState<boolean>(false);
  const [isIndexEnabled, setIsIndexEnabled] = useState<boolean>(false);
  const [selectedIndexType, setSelectedIndexType] = useState<string>('');

  const RESERVED_COLUMNS = ['created_at', 'updated_at'];

  const handleAttributeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (RESERVED_COLUMNS.includes(value.toLowerCase())) {
      setErrors(prev => ({ ...prev, attributeName: `'${value}' is a reserved column name` }));
    } else {
      setCurrentAttribute({ ...currentAttribute, name: value });
      setErrors(prev => ({ ...prev, attributeName: undefined }));
    }
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      const newOptionValue = newOption.trim();
      const newOptionObj = { value: newOptionValue, label: newOptionValue };
      const updatedOptions = [...inputOptions, newOptionObj];
      setInputOptions(updatedOptions);
      setCurrentAttribute({
        ...currentAttribute,
        options: updatedOptions
      });
      setNewOption('');
    }
  };

  const handleRemoveOption = (indexToRemove: number) => {
    const updatedOptions = inputOptions.filter((_, index) => index !== indexToRemove);
    setInputOptions(updatedOptions);
    setCurrentAttribute({
      ...currentAttribute,
      options: updatedOptions
    });
  };

  const handleInputTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputType = e.target.value;
    setSelectedInputType(inputType);
    setErrors({});
    setInputOptions([]);
  
    const inputTypeConfig = configData.inputTypes[inputType];
    
    if (inputTypeConfig) {
      if (['select', 'radio', 'checkbox'].includes(inputType)) {
        setCurrentAttribute({
          ...currentAttribute,
          inputType,
          dataType: 'array',
          options: [],
          validations: {},
          isMultiSelect: inputType === 'checkbox'
        });
        setIsMultiSelect(inputType === 'checkbox');
        setIsDataTypeDisabled(true);
      } else {
        setCurrentAttribute({
          ...currentAttribute,
          inputType,
          dataType: inputTypeConfig.dataType,
          options: inputTypeConfig.options || [],
          validations: {},
          isMultiSelect: undefined
        });
  
        if (inputTypeConfig.options) {
          setInputOptions(inputTypeConfig.options);
        }
        setIsDataTypeDisabled(false);
      }
    }
  };

  const handleDataTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrors({}); 
    const newDataType = e.target.value.toLowerCase();
    
    // Check if current input type is select, checkbox, or radio
    if (['select', 'checkbox', 'radio'].includes(currentAttribute.inputType)) {
      showToast('Data type is fixed to array for select, checkbox, and radio input types', 'error');
      return;
    }
    
    // Validate against MongoDB data types from configData
    if (configData.dataTypes.map(type => type.toLowerCase()).includes(newDataType)) {
      setErrors(prev => ({ ...prev, dataType: undefined }));
      
      setCurrentAttribute({
        ...currentAttribute,
        dataType: newDataType,
        validations: {}
      });
    } else {
      setErrors(prev => ({ ...prev, dataType: "Invalid data type" }));
    }
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const validation = configData.validations
      .flatMap(g => g.validations)
      .find(v => v.name === e.target.value);
    
    if (validation) {
      // For date and timestamp types, ensure we're using date-specific validations
      if (['date', 'timestamp'].includes(currentAttribute.dataType)) {
        if (validation.name === 'min' || validation.name === 'max') {
          setCurrentAttribute({
            ...currentAttribute,
            validations: {
              ...currentAttribute.validations,
              [validation.name]: new Date().toISOString().split('T')[0] // Set default to today's date
            }
          });
        } else {
          setCurrentAttribute({
            ...currentAttribute,
            validations: {
              ...currentAttribute.validations,
              [validation.name]: validation.hasValue ? '' : true
            }
          });
        }
      } else {
        setCurrentAttribute({
          ...currentAttribute,
          validations: {
            ...currentAttribute.validations,
            [validation.name]: validation.hasValue ? '' : true
          }
        });
      }
      // Don't set validation errors when initially adding a validation
      setValidationErrors(prev => ({ ...prev, [validation.name]: undefined }));
    }
  };

  const handleValidationValueChange = (key: string, value: string | number, validation: any) => {
    setCurrentAttribute({
      ...currentAttribute,
      validations: {
        ...currentAttribute.validations,
        [key]: value
      }
    });
    // Mark the field as interacted with by setting the error state
    setValidationErrors(prev => ({ ...prev, [key]: '' }));
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const resetInputs = () => {
    const defaultInputType = 'text';
    const defaultConfig = configData.inputTypes[defaultInputType];
    
    setSelectedInputType(defaultInputType);
    setInputOptions([]);
    setNewOption('');
    clearValidationErrors();
    setIsDataTypeDisabled(false);
    setIsIndexEnabled(false);
    setSelectedIndexType(INDEX_TYPES.SINGLE_FIELD);
    setCurrentAttribute({
      name: '',
      dataType: defaultConfig.dataType,
      defaultValue: null,
      validations: {},
      options: [],
      inputType: defaultInputType,
      isEditable: true,
      sortable: true,
      isIndexed: false
    });
  };

  const handleSelectTypeChange = (isMulti: boolean) => {
    setIsMultiSelect(isMulti);
    setCurrentAttribute({
      ...currentAttribute,
      inputType: 'select',
      isMultiSelect: isMulti
    });
  };

  const handleAddAttribute = async () => {
    setErrors({});
    let hasErrors = false;

    if (!currentAttribute.name) {
      setErrors(prev => ({ ...prev, attributeName: "Attribute name is required" }));
      hasErrors = true;
    }

    if (!selectedInputType) {
      setErrors(prev => ({ ...prev, inputType: "Input type is required" }));
      hasErrors = true;
    }

    if (!currentAttribute.dataType) {
      setErrors(prev => ({ ...prev, dataType: "Data type is required" }));
      hasErrors = true;
    }

    if ((['select', 'radio', 'checkbox'].includes(selectedInputType)) && 
        (!inputOptions || inputOptions.length === 0)) {
      setErrors(prev => ({ ...prev, options: "At least one option is required" }));
      hasErrors = true;
    }

    if (selectedInputType === 'select') {
      setCurrentAttribute({
        ...currentAttribute,
        isMultiSelect
      });
    }

    if (hasErrors) {
      return;
    }

    await originalHandleAddAttribute();
    // Reset index type after adding attribute
    setIsIndexEnabled(false);
    setSelectedIndexType(INDEX_TYPES.SINGLE_FIELD);
  };

  const handleEntitySelect = (value: string) => {
    originalHandleEntitySelect(value);
  };

  useEffect(() => {
    if (editingIndex === null) {
      resetInputs();
    }
  }, [attributes]);

  useEffect(() => {
    if (editingIndex !== null && currentAttribute.inputType) {
      setSelectedInputType(currentAttribute.inputType);
      if (currentAttribute.options) {
        setInputOptions(currentAttribute.options);
      }
      // Set index values when editing
      setIsIndexEnabled(!!currentAttribute.isIndexed);
      setSelectedIndexType(currentAttribute.indexType || INDEX_TYPES.SINGLE_FIELD);
    }
  }, [editingIndex, currentAttribute]);

  useEffect(() => {
    Object.entries(currentAttribute.validations).forEach(([key, value]) => {
      const validation = configData.validations
        .flatMap(g => g.validations)
        .find(v => v.name === key);

      // Only show validation errors if the field has been interacted with
      if (validation?.hasValue && 
          (value === '' || value === null || value === undefined) && 
          validationErrors[key] !== undefined) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: `Value is required for ${validation.label}`
        }));
      } else if (validationErrors[key] !== undefined) {
        setValidationErrors(prev => ({ ...prev, [key]: '' }));
      }
    });
  }, [currentAttribute.validations]);

  const handleIndexTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexType = e.target.value;
    setSelectedIndexType(indexType);
    setCurrentAttribute({
      ...currentAttribute,
      isIndexed: true,
      indexType: indexType || undefined
    });
  };

  const handleIndexCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsIndexEnabled(isChecked);
    if (isChecked) {
      setCurrentAttribute({
        ...currentAttribute,
        isIndexed: true,
        indexType: selectedIndexType || INDEX_TYPES.SINGLE_FIELD
      });
    } else {
      setSelectedIndexType('');
      const { indexType, isIndexed, ...rest } = currentAttribute;
      setCurrentAttribute({
        ...rest,
        isIndexed: false
      });
    }
  };

  // Add this useEffect to handle index values when editing
  useEffect(() => {
    if (editingIndex !== null && currentAttribute) {
      setIsIndexEnabled(!!currentAttribute.isIndexed);
      setSelectedIndexType(currentAttribute.indexType || '');
    }
  }, [editingIndex, currentAttribute]);

  // Add this function to get available index types based on data type
  const getAvailableIndexTypes = (dataType: string) => {
    const baseTypes = [
      { value: INDEX_TYPES.SINGLE_FIELD, label: 'Single Field Index' },
      { value: INDEX_TYPES.COMPOUND, label: 'Compound Index' },
      { value: INDEX_TYPES.UNIQUE, label: 'Unique Index' },
      { value: INDEX_TYPES.HASHED, label: 'Hashed Index' }
    ];

    if (dataType === 'string') {
      return [
        ...baseTypes,
        { value: INDEX_TYPES.TEXT, label: 'Text Index' },
        { value: INDEX_TYPES.GEOSPATIAL, label: 'Geospatial Index' }
      ];
    }

    if (['date', 'timestamp'].includes(dataType)) {
      return [
        ...baseTypes,
        { value: INDEX_TYPES.TTL, label: 'TTL Index' }
      ];
    }

    if (dataType === 'array') {
      return [
        ...baseTypes,
        { value: INDEX_TYPES.TEXT, label: 'Text Index (if string array)' },
        { value: INDEX_TYPES.GEOSPATIAL, label: 'Geospatial Index (if geospatial array)' }
      ];
    }

    return baseTypes;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold text-xl text-black dark:text-white">Entity Setup</h3>
      </div>
      
      <div className="p-6.5 space-y-4">
        {/* Auto-generated columns info */}
        <div className="flex flex-col bg-meta-9/30 dark:bg-boxdark-2 rounded-md p-2.5 border border-stroke dark:border-strokedark">
          <div className="text-sm font-medium text-black dark:text-white mb-2">
            Reserved columns:
          </div>
          <div className="flex items-center gap-2">
            {RESERVED_COLUMNS.map((col, index) => (
              <code key={col} className="inline-flex px-2.5 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded text-primary dark:text-white font-mono text-xs whitespace-nowrap shadow-sm">
                {col}
              </code>
            ))}
          </div>
        </div>

        {/* Select Entity */}
        <div>
          <label className="mb-1 block text-sm font-medium text-black dark:text-white">
            Select Entity <span className="text-meta-1">*</span>
          </label>
          <select
            value={selectedEntity}
            onChange={(e) => handleEntitySelect(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select an entity</option>
            {Object.keys(configData.entities).map((entity) => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
            <option value="custom">Create Custom Entity</option>
          </select>
        </div>

        {(isCustomEntity || selectedEntity) && (
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Entity Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              value={entityName}
              onChange={handleEntityNameChange}
              className={`w-full rounded border-[1.5px] ${
                errors.entityName ? 'border-meta-1' : 'border-stroke'
              } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter entity name"
            />
            {errors.entityName && (
              <p className="text-meta-1 text-sm mt-1">{errors.entityName}</p>
            )}
          </div>
        )}

        {(isCustomEntity || entityName) && (
          <>
            {/* Attribute Fields */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Attribute Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                value={currentAttribute.name}
                onChange={handleAttributeNameChange}
                required
                className={`w-full rounded border-[1.5px] ${
                  errors.attributeName ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                placeholder="Enter attribute name"
              />
              {errors.attributeName && (
                <p className="text-meta-1 text-sm mt-1">{errors.attributeName}</p>
              )}
            </div>

            {/* Input Type Selection */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Input Type<span className="text-meta-1">*</span>
              </label>
              <select
                value={selectedInputType || 'text'}
                onChange={handleInputTypeChange}
                className={`w-full rounded border-[1.5px] ${
                  errors.inputType ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select input type</option>
                {Object.entries(configData.inputTypes).map(([type, config]) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} ({config.htmlType || type})
                  </option>
                ))}
              </select>
              {errors.inputType && (
                <p className="text-meta-1 text-sm mt-1">{errors.inputType}</p>
              )}
            </div>

            {/* Data Type Selection */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Data Type<span className="text-meta-1">*</span>
              </label>
              <select
                value={currentAttribute.dataType}
                onChange={handleDataTypeChange}               
                className={`w-full rounded border-[1.5px] ${
                  errors.dataType ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select data type</option>
                {configData.dataTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors.dataType && (
                <p className="text-meta-1 text-sm mt-1">{errors.dataType}</p>
              )}
            </div>

            {/* Index Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isIndexEnabled}
                  onChange={handleIndexCheckboxChange}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  Add Index
                </span>
              </label>

              {isIndexEnabled && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Index Type
                  </label>
                  <select
                    value={selectedIndexType}
                    onChange={handleIndexTypeChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select index type</option>
                    {getAvailableIndexTypes(currentAttribute.dataType).map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Options Management for radio, checkbox, select */}
            {selectedInputType === 'select' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Select Type
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!isMultiSelect}
                        onChange={() => handleSelectTypeChange(false)}
                        className="form-radio h-4 w-4 text-primary"
                      />
                      <span className="ml-2 text-sm">Single Select</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={isMultiSelect}
                        onChange={() => handleSelectTypeChange(true)}
                        className="form-radio h-4 w-4 text-primary"
                      />
                      <span className="ml-2 text-sm">Multi Select</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Options input for select, radio, checkbox and array type */}
            {(['select', 'radio', 'checkbox'].includes(selectedInputType) || currentAttribute.dataType === 'array') && (
              <div className="space-y-1">
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Options <span className="text-meta-1">*</span>
                </label>
                <div className={`flex gap-2 ${errors.options ? 'border-meta-1' : ''}`}>
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => {
                      setNewOption(e.target.value);
                      setErrors({});
                    }}
                    className={`flex-1 rounded border-[1.5px] ${
                      errors.options ? 'border-meta-1' : 'border-stroke'
                    } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    placeholder="Enter option value"
                  />
                  <button
                    onClick={handleAddOption}
                    type="button"
                    className="inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                  >
                    Add Option
                  </button>
                </div>

                {/* Display options */}
                {inputOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {inputOptions.map((option, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1"
                      >
                        {option.label}
                        <button 
                          onClick={() => handleRemoveOption(index)}
                          className="ml-1 hover:text-meta-1"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {errors.options && (
                  <p className="text-meta-1 text-sm mt-1">{errors.options}</p>
                )}
              </div>
            )}

            {/* Default Value */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Default Value
              </label>
              <input
                type="text"
                value={currentAttribute.defaultValue || ''}
                onChange={handleDefaultValueChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter default value"
              />
            </div>

            {/* Validations Section */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Validations
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value=""
                    onChange={handleValidationChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Add validation</option>
                    {(() => {
                      const allValidations = new Map();
                      
                      // First add data type specific validations if they exist
                      if (currentAttribute.dataType) {
                        let validationGroup = "";
                        switch(currentAttribute.dataType.toLowerCase()) {
                          case 'string':
                            validationGroup = "String";
                            break;
                          case 'int':
                          case 'long':
                          case 'double':
                            validationGroup = "Number";
                            break;
                          case 'boolean':
                            validationGroup = "Boolean";
                            break;
                          case 'date':
                          case 'timestamp':
                            validationGroup = "Date";
                            break;
                          case 'array':
                            validationGroup = "Array";
                            break;
                        }

                        if (validationGroup) {
                          const groupValidations = configData.validations
                            .find(g => g.group === validationGroup)
                            ?.validations || [];
                          
                          groupValidations.forEach(validation => {
                            allValidations.set(validation.name, validation);
                          });
                        }
                      }
                      
                      // Then add general validations that aren't already added
                      configData.validations
                        .find(g => g.group === "General")
                        ?.validations.forEach(validation => {
                          if (!allValidations.has(validation.name)) {
                            allValidations.set(validation.name, validation);
                          }
                        });

                      return Array.from(allValidations.values()).map((validation) => (
                        <option key={validation.name} value={validation.name}>
                          {validation.label}
                        </option>
                      ));
                    })()}
                  </select>
                </div>

                {/* Display Active Validations */}
                <div className="flex flex-col gap-2">
                  {Object.entries(currentAttribute.validations).map(([key, value]) => {
                    const validation = configData.validations
                      .flatMap(g => g.validations)
                      .find(v => v.name === key);

                    if (!validation) return null;

                    return (
                      <div key={key} className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full bg-gray-50 dark:bg-boxdark-2 p-2 rounded border border-stroke dark:border-strokedark">
                          <div className="flex items-center gap-2 flex-grow">
                            <span className="text-sm">{validation.label}</span>
                            
                            {validation.hasValue && (
                              <input
                                type={(() => {
                                  if (['date', 'timestamp'].includes(currentAttribute.dataType) && 
                                      (validation.name === 'min' || validation.name === 'max')) {
                                    return 'date';
                                  }
                                  if (validation.valueType === 'date') {
                                    return 'date';
                                  }
                                  if (validation.valueType === 'number') {
                                    return 'number';
                                  }
                                  return 'text';
                                })()}
                                value={value || ''}
                                onChange={(e) => {
                                  let newValue;
                                  if (['date', 'timestamp'].includes(currentAttribute.dataType) && 
                                      (validation.name === 'min' || validation.name === 'max')) {
                                    newValue = e.target.value;
                                  } else if (validation.valueType === 'date') {
                                    const date = new Date(e.target.value);
                                    newValue = date.toISOString().split('T')[0];
                                  } else if (validation.valueType === 'number') {
                                    newValue = Number(e.target.value);
                                  } else {
                                    newValue = e.target.value;
                                  }
                                  handleValidationValueChange(key, newValue, validation);
                                }}
                                className={`flex-1 rounded border-[1.5px] ${
                                  validationErrors[key] ? 'border-meta-1' : 'border-stroke'
                                } bg-transparent px-4 py-1 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                placeholder={(() => {
                                  if (['date', 'timestamp'].includes(currentAttribute.dataType) && 
                                      (validation.name === 'min' || validation.name === 'max')) {
                                    return 'Select date';
                                  }
                                  if (validation.valueType === 'date') {
                                    return 'Select date';
                                  }
                                  if (validation.valueType === 'number') {
                                    return '0';
                                  }
                                  if (validation.isArray) {
                                    return 'Enter values separated by comma';
                                  }
                                  return 'Enter value';
                                })()}
                              />
                            )}
                          </div>

                          <button 
                            onClick={() => {
                              const { [key]: _, ...restValidations } = currentAttribute.validations;
                              setCurrentAttribute({
                                ...currentAttribute,
                                validations: restValidations
                              });
                              setValidationErrors(prev => {
                                const { [key]: _, ...rest } = prev;
                                return rest;
                              });
                            }}
                            className="text-meta-1 hover:text-meta-1/80 p-1 ml-2"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        {validationErrors[key] && (
                          <p className="text-meta-1 text-sm mt-1 ml-2">{validationErrors[key]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddAttribute}
              className="flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
            >
              {addButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
} 