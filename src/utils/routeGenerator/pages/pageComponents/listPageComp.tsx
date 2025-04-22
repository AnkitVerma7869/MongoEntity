/**
 * List Page Component Generator
 * Generates React components for displaying entity records in a table
 */

import { Attribute, Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { showToast, toasterConfig } from '../../../toast';
import { formatEntityName, formatFieldName, formatDateTime, safeGet } from '../../utils/commonUtils';

/**
 * Generates a complete list page component for an entity
 * Includes data fetching, pagination, sorting, and CRUD operations
 * 
 * Features:
 * - Data grid with sorting and pagination
 * - Delete confirmation modal
 * - Toast notifications
 * - Loading states
 * - Navigation to create/edit/view pages
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateListPage(config: Entity): string {
  const { packages } = generatePackageImports(config, { list: true });
  const formattedEntityName = formatEntityName(config.entityName);
  
  const dynamicImports = `import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import {  Pencil, Trash2 } from 'lucide-react';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Toaster } from 'react-hot-toast';
import { showToast, toasterConfig } from "../../utils/toast";
import { formatDateTime,safeGet } from "../../utils/commonUtils";
import DeleteConfirmationModal from '@/components/models/DeleteConfirmationModal';
`;

  // Filter out attributes that shouldn't be displayed in the list
  const displayableAttributes = config.attributes.filter(attr => attr.displayInList !== false);

  const columns = displayableAttributes.map((attr, index) => {
    const fieldName = formatFieldName(attr.name);
    const headerName = formatFieldName(attr.name);
    
    // Base column configuration
    const baseColumn = `{
      field: '${fieldName}',
      headerName: '${headerName}',
      flex: 1,
      sortable: ${attr.sortable !== false},
      disableColumnMenu: true
    }`;
    
    let renderCell = `params.row.${fieldName}`;
    if (['date', 'datetime', 'timestamp'].includes(attr.dataType.toLowerCase())) {
      renderCell = `formatDateTime(params.row.${fieldName})`;
    }
    
    // Make first column clickable for view
    if (index === 0) {
      renderCell = `(
        <span 
          className="cursor-pointer text-primary hover:text-primary-dark hover:underline"
          onClick={() => router.push(\`/${config.entityName.toLowerCase()}/\${params.row.id}\`)}
        >
          {safeGet(params.row, '${fieldName}')}
        </span>
      )`;
    } else {
      renderCell = `{safeGet(params.row, '${fieldName}')}`;
    }
    
    return `{
      ...${baseColumn},
      renderCell: (params) => ${renderCell}
    }`;
  });

  return `'use client';
${dynamicImports}

export default function ${formattedEntityName}ListPage() {
  const router = useRouter();
  const { records, loading, error, fetchRecords, deleteRecord } = use${formattedEntityName}Store();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleDelete = async (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const columns = [
    ${columns.join(',\n    ')},
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Edit">
            <IconButton onClick={() => router.push(\`/${config.entityName.toLowerCase()}/edit/\${params.row.id}\`)}>
              <Pencil className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Trash2 className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <>
      <Toaster {...toasterConfig} />
      <div className="p-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">${formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1)} List</h3>
                <button
                  onClick={() => router.push(\`/${config.entityName.toLowerCase()}/create\`)}
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                >
                  Create New
                </button>
              </div>
            </div>
            <div className="p-6.5">
              <DataGrid
                rows={records}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 }
                  },
                  sorting: {
                    sortModel: [{ field: '${config.attributes[0]?.name || 'id'}', sort: 'desc' }]
                  }
                }}
                sortingOrder={['desc', 'asc']}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (selectedId) {
            const { success, error } = await deleteRecord(selectedId);
            if (success) {
              showToast(success, 'success');
              fetchRecords();
            } else if (error) {
              showToast(error, 'error');
            }
            setDeleteModalOpen(false);
            setSelectedId(null);
          }
        }}
      />
    </>
  );
}`;
}