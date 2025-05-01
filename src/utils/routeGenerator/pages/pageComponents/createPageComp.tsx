/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { getFormValidationSchema } from '../../schemas/entityValidationSchema';
import { showToast, toasterConfig } from '../../../toast';
import { formatEntityName, formatEntityDisplayName } from '../../utils/commonUtils';

/**
 * Formats a field name for React Hook Form registration
 * Replaces spaces with underscores for valid JavaScript identifiers
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted field name
 */
function formatFieldName(name: string): string {
  return name.replace(/\s+/g, '_');
}

/**
 * Generates a complete create page component for an entity
 * Includes form handling, validation, and API integration
 * 
 * Features:
 * - Form validation using Yup
 * - Date formatting for API submission
 * - Toast notifications for feedback
 * - Loading states
 * - Navigation after successful creation
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateCreatePage(config: Entity): string {
  const { packages } = generatePackageImports(config, { create: true });
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Filter out packages we need for imports
  const needsDatePicker = config.attributes.some(attr => 
    ['date', 'datetime', 'timestamp'].includes(attr.dataType.toLowerCase())
  );
  const needsPhoneInput = config.attributes.some(attr => 
    attr.inputType.toLowerCase() === 'tel'
  );
  const needsSelect = config.attributes.some(attr => 
    attr.inputType.toLowerCase() === 'select'
  );

  const dynamicImports = `import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/validationschemas/${config.entityName.toLowerCase()}Schema';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Toaster } from 'react-hot-toast';
import { showToast, toasterConfig } from "../../utils/toast";
import { formatLocalToISOString } from "../../utils/commonUtils";
${needsDatePicker ? "import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';" : ''}
${needsPhoneInput ? "import PhoneNumberInput from '@/components/PhoneNumberInput/index';" : ''}
${needsSelect ? "import Select from 'react-select';" : ''}
`;
    
  const dateColumns = config.attributes.filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local'].some(type => attr.dataType.toLowerCase().includes(type))).map(attr => `'${attr.name}'`);
  const fileColumns = config.attributes.filter(attr => attr.inputType.toLowerCase() === 'file').map(attr => `'${attr.name}'`);

  return `'use client';
${dynamicImports}

export default function ${formattedEntityName}CreatePage() {
  const router = useRouter();
  const { loading, error, createRecord } = use${formattedEntityName}Store();
  
  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const DateFormatColumns = [${dateColumns.join(', ')}];
  const FileColumns = [${fileColumns.join(', ')}];

  const onSubmit = async (data: any) => {
    const formattedData = { ...data };
    DateFormatColumns.forEach(columnName => {
      if (formattedData[columnName]) {
        formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);
      }
    });

    // Handle file paths
    FileColumns.forEach(columnName => {
      if (formattedData[columnName]) {
        // File paths are already in the correct format from the upload
        formattedData[columnName] = formattedData[columnName];
      }
    });

    try {
      const response = await createRecord(formattedData);
      const { success, error, recordId } = response;
      if (success) {
        showToast(success, 'success');
        setTimeout(() => {
          router.push('/${config.entityName.toLowerCase()}');
        }, 2000);
      } else if (error) {
        console.error('Create record error:', error);
        showToast(error, 'error');
      }
    } catch (err) {
      console.error('Unexpected error during record creation:', err);
      showToast(err instanceof Error ? err.message : 'An unexpected error occurred', 'error');
    }
  };

  return (
    <>
      <Toaster {...toasterConfig} />
      <div className="p-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-black dark:text-white">Create ${formatEntityDisplayName(config.entityName)}</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="p-6.5">
                ${generateField(config)}
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={() => router.back()} className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">Cancel</button>
                  <button type="submit" disabled={loading} className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90">{loading ? 'Creating...' : 'Create'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}`;
}