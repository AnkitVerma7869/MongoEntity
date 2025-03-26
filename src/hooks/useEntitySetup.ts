import { useState } from 'react';
import { Attribute, ConfigData } from "../interfaces/types";
import { initialAttributeState } from "../utils/utilstableform";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { entityNameSchema, attributeNameSchema } from '../schemas/validationSchemas';

interface UseEntitySetupProps {
  configData: ConfigData;
  entityName: string;
  setEntityName: (name: string) => void;
  attributes: Attribute[];
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  currentAttribute: Attribute;
  setCurrentAttribute: (attribute: Attribute) => void;
  setIsCustomEntity: (isCustom: boolean) => void;
  setSelectedEntity: (entity: string) => void;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export const useEntitySetup = ({
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
}: UseEntitySetupProps) => {
  const [errors, setErrors] = useState<{
    entityName?: string;
    attributeName?: string;
    dataType?: string;
    inputType?: string;
    options?: string;
  }>({});

  const validateEntityName = async (name: string) => {
    try {
      if (!name) return false;
      await entityNameSchema.validate(name);
      setErrors(prev => ({ ...prev, entityName: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, entityName: err.message }));
      }
      return false;
    }
  };

  const validateAttributeName = async (name: string) => {
    try {
      if (!name) return false;
      await attributeNameSchema.validate(name);
      setErrors(prev => ({ ...prev, attributeName: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, attributeName: err.message }));
      }
      return false;
    }
  };

  const handleEntitySelect = (selected: string) => {
    setSelectedEntity(selected);
    setErrors({});
    
    // Reset form fields
    setCurrentAttribute(initialAttributeState);
    setEditingIndex(null);
    
    if (selected === "custom") {
      setIsCustomEntity(true);
      setEntityName("");
      setAttributes([]);
    } else if (selected) {
      setIsCustomEntity(false);
      setEntityName(selected);
      const existingAttributes = configData.entities[selected]?.attributes || [];
      const attributesWithDefaults = existingAttributes.map((attr: Attribute) => ({
        ...attr,
        isEditable: true,
        sortable: true
      }));
      setAttributes(attributesWithDefaults);
    } else {
      setIsCustomEntity(false);
      setEntityName("");
      setAttributes([]);
    }
  };

  const handleEntityNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntityName(value);
    await validateEntityName(value);
  };

  const handleAttributeNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ ...currentAttribute, name: value });
    await validateAttributeName(value);
  };

  const handleDefaultValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ ...currentAttribute, defaultValue: value });
  };

  const handleValidationsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ 
      ...currentAttribute, 
      validations: { required: value === 'required' }
    });
  };

  const handleAddAttribute = async () => {
    try {
      // Check for duplicate attribute name
      const duplicateAttr = attributes.find((attr, index) => 
        attr.name.toLowerCase() === currentAttribute.name.toLowerCase() && 
        index !== editingIndex
      );

      if (duplicateAttr) {
        showToast(`Attribute name "${currentAttribute.name}" already exists!`, 'error');
        return;
      }

      setErrors({});

      const trimmedAttribute = {
        ...currentAttribute,
        name: currentAttribute.name.trim(),
        defaultValue: currentAttribute.defaultValue?.trim() || '',
        isEditable: currentAttribute.isEditable ?? true,
        sortable: currentAttribute.sortable ?? true
      };

      if (!trimmedAttribute.name) {
        setErrors(prev => ({ ...prev, attributeName: "Attribute name is required" }));
        return;
      }

      if (!trimmedAttribute.dataType) {
        setErrors(prev => ({ ...prev, dataType: "Data type is required" }));
        return;
      }

      if (!trimmedAttribute.inputType) {
        showToast("Input type is required", 'error');
        return;
      }

      const nameValid = await validateAttributeName(trimmedAttribute.name);
      if (!nameValid) {
        return;
      }

      if (editingIndex !== null) {
        setAttributes(prev => prev.map((attr, index) => 
          index === editingIndex ? trimmedAttribute : attr
        ));
        setEditingIndex(null);
        showToast("Attribute updated successfully!", 'success');
      } else {
        setAttributes(prev => [...prev, trimmedAttribute]);
        showToast("Attribute added successfully!", 'success');
      }

      setCurrentAttribute(initialAttributeState);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        showToast(error.message, 'error');
      } else if (error instanceof Error) {
        showToast(`Failed to add attribute: ${error.message}`, 'error');
      } else {
        showToast("An unexpected error occurred while adding the attribute", 'error');
      }
      console.error("Error in handleAddAttribute:", error);
    }
  };

  return {
    errors,
    setErrors,
    handleEntitySelect,
    handleEntityNameChange,
    handleAttributeNameChange,
    handleDefaultValueChange,
    handleValidationsChange,
    handleAddAttribute
  };
}; 