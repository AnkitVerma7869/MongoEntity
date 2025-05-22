/**
 * Edit Page Component Generator
 * Generates React components for editing existing entity records
 */

import { Attribute, Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { showToast, toasterConfig } from '../../../toast';
import { formatEntityName, formatEntityDisplayName, formatFieldName, formatLocalToISOString, convertToLocal } from '../../utils/commonUtils';

/**
 * Generates a complete edit page component for an entity
 * Includes form handling, data fetching, validation, and API integration
 * 
 * Features:
 * - Data fetching and population
 * - Form validation using Yup
 * - Date format conversion
 * - Toast notifications
 * - Loading states
 * - Navigation after successful update
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateEditPage(config: Entity): string {
  const { packages } = generatePackageImports(config, { edit: true });
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
import * as yup from 'yup';
import { validationSchema } from '@/validationschemas/${config.entityName.toLowerCase()}Schema';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Toaster } from 'react-hot-toast';
import { showToast, toasterConfig } from "../../utils/toast";
import { convertToLocal, formatLocalToISOString } from "../../utils/commonUtils";
${needsDatePicker ? "import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';" : ''}
${needsPhoneInput ? "import PhoneNumberInput from '@/components/PhoneNumberInput/index';" : ''}
${needsSelect ? "import Select from 'react-select';" : ''}
`;

  const dateColumns = config.attributes.filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local'].some(type => attr.dataType.toLowerCase().includes(type))).map(attr => `'${attr.name}'`);
  const fileColumns = config.attributes.filter(attr => attr.inputType.toLowerCase() === 'file').map(attr => `'${attr.name}'`);

  return `'use client';
${dynamicImports}

export default function ${formattedEntityName}EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { loading, error, updateRecord, fetchRecord } = use${formattedEntityName}Store();
  
  const { register, control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const DateFormatColumns = [${dateColumns.join(', ')}];
  const FileColumns = [${fileColumns.join(', ')}];

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const record = await fetchRecord(params.id);
        if (record) {
          const { created_at, updated_at, __v, ...formattedData } = record;
          DateFormatColumns.forEach(columnName => {
            if (formattedData[columnName]) {
              formattedData[columnName] = convertToLocal(formattedData[columnName]);
            }
          });
          reset(formattedData);
        }
      } catch (err) {
        console.error('Failed to load record:', err);
      }
    };
    loadRecord();
  }, [params.id, reset, fetchRecord]);

  const onSubmit = async (data) => {  
    const { created_at, updated_at, ...formattedData } = { ...data };
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

    const { success, error } = await updateRecord(params.id, formattedData);
    if (success) {
      showToast(success, 'success');
      setTimeout(() => {
        router.push('/${config.entityName.toLowerCase()}');
      }, 2000);
    } else if (error) {
      showToast(error, 'error');
    }
  };

  return (
    <>
      <Toaster {...toasterConfig} />
      <div className="p-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-black dark:text-white">Edit ${formatEntityDisplayName(config.entityName)}</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="p-6.5">
                ${generateField(config, true)}
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={() => router.back()} className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">Cancel</button>
                  <button type="submit" disabled={loading} className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90">{loading ? 'Updating...' : 'Update'}</button>
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

/**
 * Generates a reusable edit form component
 * Can be used for both create and edit operations
 * 
 * @param {string} entityName - Name of the entity
 * @param {Attribute[]} attributes - Entity attributes
 * @returns {string} Generated component code
 */
export function generateEditPageComponent(entityName: string, attributes: Attribute[]) {
  const componentName = `${entityName}Edit`;
  
  return `
    import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

    interface ${componentName}Props {
      register: UseFormRegister<any>;
      handleSubmit: UseFormHandleSubmit<any>;
      onSubmit: (data: any) => Promise<void>;
      errors: FieldErrors<any>;
      isEdit?: boolean;
    }

    export default function ${componentName}({
      register,
      handleSubmit,
      onSubmit,
      errors,
      isEdit = true
    }: ${componentName}Props) {
      return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {isEdit ? 'Edit' : 'Create'} ${entityName}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              ${generateField({ entityName, attributes })}
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:shadow-1"
                >
                  {isEdit ? 'Update' : 'Save'} ${entityName}
                </button>
                
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  `;
} 