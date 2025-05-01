/**
 * Number Field Generator
 * Generates HTML/JSX for integer input form fields
 */

import { Attribute } from '../../../../interfaces/types';

/**
 * Generates an integer input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default number value
 * @returns {string} Generated number field JSX
 */
export function generateNumberField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <input
        type="number"
        step="1"
        {...register("${fieldName}")}
        defaultValue="${defaultValue || ''}"
        placeholder="${attr.config?.placeholder || `Enter ${attr.name.toLowerCase()}`}"
        className="${className}"
        ${isDisabled ? 'disabled' : ''}
        onKeyPress={(e) => {
          // Only allow numbers for integer types
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 