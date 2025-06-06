/**
 * Checkbox Field Generator
 * Generates HTML/JSX for checkbox form fields
 */

import { Attribute } from '../../../../interfaces/types';
import { Controller } from 'react-hook-form';

/**
 * Generates a checkbox field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default checked values (comma-separated)
 * @returns {string} Generated checkbox field JSX
 */
export function generateCheckboxField(attr: Attribute, fieldName: string, defaultValue: string) {
  const defaultValues = defaultValue ? defaultValue.split(',').map(v => v.trim()) : [];
  const isDisabled = attr.config?.disabled || false;
  const className = `mr-3 h-5 w-5 cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="flex flex-wrap">
        <Controller
          name="${fieldName}"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value, ...field } }) => (
            <>
              ${(attr.options || []).map(option => `
                <label className="flex items-center min-w-[120px] text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    {...field}
                    value="${option.value}"
                    checked={value?.includes("${option.value}")}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(value || []), "${option.value}"]
                        : (value || []).filter(v => v !== "${option.value}");
                      onChange(newValue);
                    }}
                    className="${className}"
                    ${isDisabled ? 'disabled' : ''}
                  />
                  ${option.label}
                </label>
              `).join('')}
            </>
          )}
        />
      </div>
       {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 