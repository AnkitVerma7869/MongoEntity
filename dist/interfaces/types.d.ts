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
    [key: string]: any;
}
export interface Attribute {
    name: string;
    dataType: string;
    inputType: string;
    defaultValue: string | null;
    validations: ValidationRules;
    options?: Array<{
        value: string;
        label: string;
    }>;
    isEditable?: boolean;
    sortable?: boolean;
    isMultiSelect?: boolean;
    isReadOnly?: boolean;
    displayInList?: boolean;
    references?: IReference;
    indexType?: string;
    isIndexed?: boolean;
    config?: {
        accept?: string[];
        multiple?: boolean;
        maxSize?: number;
        placeholder?: string;
        format?: string;
        [key: string]: any;
    };
}
export interface IReference {
    table: string;
    column: string;
    onDelete?: string;
    onUpdate?: string;
}
export interface Entity {
    entityName: string;
    attributes: Attribute[];
    references?: IReference[];
}
export interface ConfigData {
    entities: Record<string, any>;
    dataTypes: string[];
    validations: ValidationGroup[];
    inputTypes: {
        [key: string]: {
            dataType: string;
            htmlType: string;
            options?: Array<{
                value: string;
                label: string;
            }>;
            min?: number;
            max?: number;
            step?: number;
            isDataTypeFixed?: boolean;
        };
    };
}
