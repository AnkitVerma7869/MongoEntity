// Interface for validation rules
export interface ValidationRule {
  name: string;
  label: string;
  hasValue?: boolean;
  valueType?: 'string' | 'number' | 'date';
  isArray?: boolean;
}

export interface ValidationGroup {
  group: string;
  validations: ValidationRule[];
}

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  [key: string]: any;  // Allow additional validation rules
}

// Interface for table column attributes
export interface Attribute {
  name: string;          
  dataType: string;   
  inputType: string; 
  defaultValue: string | null; 
  validations: ValidationRules; 
  options?: Array<{ value: string; label: string }>;
  isEditable?: boolean;
  sortable?: boolean;
  isMultiSelect?: boolean;
  isReadOnly?: boolean;
  displayInList?: boolean;  
  references?: IReference;
  indexType?: string;
  isIndexed?: boolean;
  config?: {             // Additional configuration for specific input types
    accept?: string[];   // Accepted file types
    multiple?: boolean;  // Allow multiple selections
    maxSize?: number;    // Maximum file size
    placeholder?: string;// Placeholder text
    format?: string;     // Date format
    [key: string]: any; // Other config options
  };
}

// Interface for reference configuration
export interface IReference {
  table: string;
  column: string;
  onDelete?: string;
  onUpdate?: string;
}

// Interface for complete entity/table definition
export interface Entity {
  entityName: string;    // Table name
  attributes: Attribute[]; // Table columns
  references?: IReference[]; // Table references
}

// Interface for configuration data
export interface ConfigData {
  entities: Record<string, any>;  // Existing entities
  dataTypes: string[];           // Available SQL data types
  validations: ValidationGroup[];  // Available validation rules grouped by type
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
  };      
} 