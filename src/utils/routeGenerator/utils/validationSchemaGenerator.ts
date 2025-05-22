import { Attribute } from '../../../interfaces/types';

export function generateValidationSchema(attributes: Attribute[]) {
  let schemaFields = attributes.map(attr => {
    const fieldName = attr.name.replace(/\s+/g, '_');
    function formatFieldName(name: string): string {
      // If name contains hyphen, wrap it in quotes
      return name.includes('-') ? `'${name}'` : name;
    }

    function capitalizeFirst(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const formattedFieldName = formatFieldName(fieldName);
    const yupType = getYupType(attr);
    
    // Start with the type declaration
    let schema = `${formattedFieldName}: yup.${yupType}()`;

    // Special handling for telephone fields
    if (attr.inputType.toLowerCase() === 'tel') {
      schema = `${formattedFieldName}: yup.string()`
      return schema;
    }

    // For checkbox, radio, and select with options, add validation for array of strings
    if (['checkbox', 'radio', 'select'].includes(attr.inputType.toLowerCase()) && Array.isArray(attr.options) && attr.options.length > 0) {
      schema = `${formattedFieldName}: yup.array().of(yup.string())`;
      
      if (attr.validations?.required) {
        schema += '.min(1, "Please select at least one option")';
      }
      
      if (attr.validations?.min !== undefined) {
        schema += `.min(${attr.validations.min}, "Please select at least ${attr.validations.min} options")`;
      }
      
      if (attr.validations?.max !== undefined) {
        schema += `.max(${attr.validations.max}, "Please select at most ${attr.validations.max} options")`;
      }

      // For radio fields, ensure only one value is selected
      if (attr.inputType.toLowerCase() === 'radio') {
        schema += '.max(1, "Please select only one option")';
      }
      
      return schema;
    }

    // Add typeError based on the field type
    if (yupType === 'number') {
      schema += `.typeError("${capitalizeFirst(attr.name)} must be a number")`;
      // For optional number fields, add transform to handle empty values
      if (!attr.validations?.required) {
        schema += `.nullable().transform((value) => (isNaN(value) ? null : value))`;
      }
    } else if (yupType === 'date') {
      schema += `.typeError("${capitalizeFirst(attr.name)} must be a valid date")`;
    }

    if (attr.validations) {
      // Debug log for validations
      console.log('Validations for', attr.name, ':', attr.validations);

      // Add required validation if needed
      if (attr.validations.required) {
        schema += '.required("This field is required")';
      }

      // Handle nullable validation
      if (attr.validations.nullable) {
        schema += '.nullable()';
      }

      // Handle string-specific validations
      if (yupType === 'string') {
        if (attr.validations.min) {
          schema += `.min(${attr.validations.min}, "Must be at least ${attr.validations.min} characters")`;
        }
        if (attr.validations.max) {
          schema += `.max(${attr.validations.max}, "Must be at most ${attr.validations.max} characters")`;
        }
        if (attr.validations.length) {
          schema += `.length(${attr.validations.length}, "Must be exactly ${attr.validations.length} characters")`;
        }
        if (attr.validations.trim) {
          schema += '.trim()';
        }
        if (attr.validations.toLowerCase) {
          schema += '.transform(value => value?.toLowerCase())';
        }
        if (attr.validations.toUpperCase) {
          schema += '.transform(value => value?.toUpperCase())';
        }
        if (attr.validations.email || attr.inputType.toLowerCase() === 'email') {
          schema += '.email("Invalid email format")';
        }
        if (attr.validations.url || attr.inputType.toLowerCase() === 'url') {
          schema += '.url("Invalid URL format")';
        }
        if (attr.validations.uuid) {
          schema += '.uuid("Invalid UUID format")';
        }
        if (attr.validations.includes) {
          schema += `.test('includes', "Must include '${attr.validations.includes}'", value => value?.includes('${attr.validations.includes}') || false)`;
        }
        if (attr.validations.regex) {
          schema += `.matches(new RegExp('${attr.validations.regex}'), "Does not match the required pattern")`;
          }
        if (attr.validations.startsWith) {
          schema += `.test('starts-with', "Must start with '${attr.validations.startsWith}'", value => value?.startsWith('${attr.validations.startsWith}') || false)`;
        }
        if (attr.validations.endsWith) {
          schema += `.test('ends-with', "Must end with '${attr.validations.endsWith}'", value => value?.endsWith('${attr.validations.endsWith}') || false)`;
        }
        if (attr.validations.datetime) {
          schema += `.test('is-datetime', "Invalid datetime string! Must be UTC.", value => !isNaN(Date.parse(value)))`;
        }
        if (attr.validations.date) {
          schema += `.test('is-date', "Invalid date string! Must be in YYYY-MM-DD format.", value => /^\d{4}-\d{2}-\d{2}$/.test(value))`;
        }
        if (attr.validations.time) {
          schema += `.test('is-time', "Invalid time string! Must be in HH:mm format.", value => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value))`;
        }
      }

      // Handle number-specific validations
      if (yupType === 'number') {
        if (attr.validations.integer) schema += '.integer("Must be an integer")';
        if (attr.validations.positive) schema += '.positive("Must be a positive number")';
        if (attr.validations.negative) schema += '.test("is-negative", "Must be a negative number", value => value < 0)';
        if (attr.validations.nonnegative) schema += '.min(0, "Must be a non-negative number")';
        if (attr.validations.nonpositive) schema += '.max(0, "Must be a non-positive number")';
        if (attr.validations.gt !== undefined) schema += `.moreThan(${attr.validations.gt}, "Must be greater than ${attr.validations.gt}")`;
        if (attr.validations.gte !== undefined) schema += `.min(${attr.validations.gte}, "Must be greater than or equal to ${attr.validations.gte}")`;
        if (attr.validations.lt !== undefined) schema += `.lessThan(${attr.validations.lt}, "Must be less than ${attr.validations.lt}")`;
        if (attr.validations.lte !== undefined) schema += `.max(${attr.validations.lte}, "Must be less than or equal to ${attr.validations.lte}")`;
        if (attr.validations.multipleOf !== undefined) schema += `.test("is-multiple", "Must be a multiple of ${attr.validations.multipleOf}", value => value % ${attr.validations.multipleOf} === 0)`;
        if (attr.validations.finite) schema += '.test("is-finite", "Must be a finite number", value => Number.isFinite(value))';
        if (attr.validations.safe) schema += '.test("is-safe", "Must be a safe integer", value => Number.isSafeInteger(value))';
      }

      // Handle boolean-specific validations
      if (yupType === 'boolean') {
        if (attr.validations.required) schema += '.required("This field is required")';
        if (!attr.validations.required) schema += '.optional()';
        if (attr.validations.nullable || !attr.validations.required) schema += '.nullable()';
      }

      // Handle date-specific validations
      if (yupType === 'date') {
        schema += '.transform((value, originalValue) => originalValue ? new Date(originalValue) : value)';
        if (attr.validations.required) schema += '.required("This field is required")';
        if (attr.validations.minDate) schema += `.min(new Date('${attr.validations.minDate}'), "Must be after ${attr.validations.minDate}")`;
        if (attr.validations.maxDate) schema += `.max(new Date('${attr.validations.maxDate}'), "Must be before ${attr.validations.maxDate}")`;
        if (!attr.validations.required) schema += '.optional()';
        if (attr.validations.nullable || !attr.validations.required) schema += '.nullable()';
      }

      // Handle array-specific validations
      if (yupType === 'array') {
        if (attr.validations.enumValues && attr.validations.enumValues.length > 0) {
          const enumValues = attr.validations.enumValues.map((v: any) => `'${v}'`).join(', ');
          schema += `.of(yup.mixed().oneOf([${enumValues}], "Must be a valid enum value"))`;
        }
        if (attr.validations.required) schema += '.required("This field is required")';
        if (attr.validations.minItems) schema += `.min(${attr.validations.minItems}, "Must have at least ${attr.validations.minItems} items")`;
        if (attr.validations.maxItems) schema += `.max(${attr.validations.maxItems}, "Must have at most ${attr.validations.maxItems} items")`;
        if (attr.validations.length) schema += `.length(${attr.validations.length}, "Must contain exactly ${attr.validations.length} items")`;
        if (!attr.validations.required) schema += '.optional()';
        if (attr.validations.nullable || !attr.validations.required) schema += '.nullable()';
      }
    }
    return schema;
  }).join(',\n');

  return schemaFields;
}

function getYupType(attr: Attribute): string {
  const inputType = attr.inputType.toLowerCase();
  const dataType = attr.dataType.toLowerCase();
  
  // Handle select and radio fields as array
  if (inputType === 'select' || inputType === 'radio') {
    return 'array';
  }
  
  // Handle checkbox as array when it has options
  if (inputType === 'checkbox' && Array.isArray(attr.options) && attr.options.length > 0) {
    return 'array';
  }
  
  // Always treat number input type as number regardless of dataType
  if (inputType === 'number') return 'number';
  
  // Handle date input type
  if (inputType === 'date') return 'date';
  
  // Then handle data types
  if (dataType === 'number') {
    return 'number';
  }
  if (dataType === 'decimal128') {
    return 'number';
  }
  if (dataType === 'date') {
    return 'date';
  }
  if (dataType === 'boolean') {
    return 'boolean';
  }
  if (dataType === 'array' || attr.validations?.isArray) {
    return 'array';
  }
  // Default to string for all other types
  return 'string';
} 
