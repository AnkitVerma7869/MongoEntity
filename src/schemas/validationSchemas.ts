/**
 * Validation Schemas Module
 * Defines Yup validation schemas for entity and attribute validation
 */

import * as yup from "yup";

/**
 * Schema for validating entity names
 * Rules:
 * - Required
 * - No spaces allowed
 * - Must start with letter or underscore
 * - Must contain at least 2 letters
 * - Length between 2-50 characters
 */
export const entityNameSchema = yup.string()
  .required("Entity name is required")
  .transform(value => value?.trim())
  .test('no-spaces', 'Spaces are not allowed in entity name', (value: string | undefined): boolean => 
    value ? !value.includes(' ') : true
  )
  .matches(
    /^[a-zA-Z_][a-zA-Z0-9_-]*$/, 
    "Entity name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens"
  )
  .test(
    'min-letters',
    'Entity name must contain at least 2 alphabetic characters',
    (value: string | undefined): boolean => 
      value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true
  )
  .min(2, "Entity name must be at least 2 characters")
  .max(50, "Entity name must not exceed 50 characters");

/**
 * Schema for validating attribute names
 * Similar rules to entity name but specific to column attributes
 */
export const attributeNameSchema = yup.string()
  .required("Attribute name is required")
  .transform(value => value?.trim())
  .test('no-spaces', 'Spaces are not allowed in attribute name', (value: string | undefined): boolean => 
    value ? !value.includes(' ') : true
  )
  .matches(
    /^[a-zA-Z_][a-zA-Z0-9_-]*$/, 
    "Attribute name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens"
  )
  .test(
    'min-letters',
    'Attribute name must contain at least 2 alphabetic characters',
    (value: string | undefined): boolean => 
      value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true
  )
  .min(2, "Attribute name must be at least 2 characters")
  .max(50, "Attribute name must not exceed 50 characters");

/**
 * Schema for validating data types
 * Ensures selected type is not empty
 */
export const dataTypeSchema = yup.string()
  .required("Data type is required");

// Update enum values schema to require at least one value
export const enumValuesSchema = yup.array()
  .min(1, 'At least one option is required')
  .test(
    'unique-enum-values',
    'Enum values must be unique (case-insensitive)',
    function(values?: Array<{ value: string; label: string }>) {
      if (!values || values.length === 0) return true;

      const lowercaseValues = values.map(v => v.value.toLowerCase());
      const uniqueValues = new Set(lowercaseValues);

      return uniqueValues.size === values.length;
    }
  ); 