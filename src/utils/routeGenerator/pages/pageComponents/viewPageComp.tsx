/**
 * View Page Component Generator
 * Generates a React component for displaying detailed entity record information
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { showToast, toasterConfig } from '../../../toast';
import { formatEntityName, formatFieldLabel, formatDateTime, handleApiCall, safeGet, formatEntityDisplayName } from '../../utils/commonUtils';

/**
 * Generates a view page component for an entity
 * Displays detailed information about a single record
 * 
 * Features:
 * - Responsive layout
 * - Field formatting
 * - Date formatting
 * - Loading states
 * - Error handling
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateViewPage(config: Entity): string {
  const { packages } = generatePackageImports(config, { view: true });
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Filter out sensitive fields
  const displayableAttributes = config.attributes.filter(attr => 
    !attr.name.toLowerCase().includes('password') && 
    attr.inputType.toLowerCase() !== 'password'
  );

  return `
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { showToast,toasterConfig } from "../../utils/toast"
import { formatDateTime,handleApiCall,safeGet } from "../../utils/commonUtils"

/**
 * View Page Component for ${formattedEntityName}
 * Displays detailed information about a single ${formattedEntityName} record
 */
export default function ${formattedEntityName}ViewPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { 
      loading, 
      error, 
      fetchRecord, 
      currentRecord 
    } = use${formattedEntityName}Store();
    
    // State management
    const [record, setRecord] = useState<any>(null);

    /**
     * Fetches and formats record data from the API
     * Handles date formatting for date columns
     */
    useEffect(() => {
      const fetchData = async () => {
        await handleApiCall(
          () => fetchRecord(params.id),
          (data) => {
            const formattedData = { ...data };
            // Format date fields if needed
            if (data.created_at) formattedData.created_at = formatDateTime(data.created_at);
            if (data.updated_at) formattedData.updated_at = formatDateTime(data.updated_at);
            setRecord(formattedData);
          },
          (error) => {
            showToast('error', error);
          },
          () => {} // No need for loading state as it's handled by the store
        );
      };
      fetchData();
    }, [params.id]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-danger mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary-dark"
          >
            Go Back
          </button>
        </div>
      );
    }

    if (!record) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-meta-1 mb-4">Record not found</p>
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary-dark"
          >
            Go Back
          </button>
        </div>
      );
    }
  
    return (
      <>
        <Toaster {...toasterConfig} />
        <div className="p-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.back()}
                    className="text-primary hover:text-primary-dark"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    ${formatEntityDisplayName(config.entityName)} Details
                  </h3>
                </div>
              </div>

              <div className="p-6.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  ${displayableAttributes.map(attr => `
                    <div className="col-span-1">
                      <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                        ${formatFieldLabel(attr.name)}
                      </label>
                      <div className="text-sm text-black dark:text-white">
                        ${(() => {
                          if (attr.inputType.toLowerCase() === 'date') {
                            return `{formatDateTime(safeGet(record, '${attr.name}'))}`;
                          } else if (attr.inputType.toLowerCase() === 'checkbox') {
                            return `{Array.isArray(safeGet(record, '${attr.name}')) ? safeGet(record, '${attr.name}').join(', ') : safeGet(record, '${attr.name}')}`;
                          } else if (attr.inputType.toLowerCase() === 'tel') {
                            return `{(() => {
                              const phone = safeGet(record, '${attr.name}');
                              if (!phone) return '-';
                              const countryCode = phone.slice(0, 2);
                              const number = phone.slice(2);
                              return \`+\${countryCode} \${number}\`;
                            })()}`;
                          } else {
                            return `{safeGet(record, '${attr.name}')}`;
                          }
                        })()}
                      </div>
                    </div>
                  `).join('\n                  ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
`
}