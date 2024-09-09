'use client';

import { useDocumentType } from '@/app/(routes)/(settings)/document-types/components/hooks';
import { DocumentType } from '@/models/settings/documentType';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Button, DataGrid } from '@/components';

import { DeleteDocumentType, FormDocumentType, RestoreDocumentType } from './partials';

export const DocumentTypes = () => {
  const {
    error,
    restoreDocumentType,
    editingDocumentType,
    deletingDocumentType,
    handleDelete,
    handleActivate,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isModalOpen,
    isLoading,
    handleEdit,
    handleModalOpenChange,
    setPage,
    page,
    form,
    data,
    columns,
    pageSize,
    setEditingDocumentType,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setDeletingDocumentType,
    setRestoreDocumentType,
    handleSearch,
  } = useDocumentType();

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormDocumentType
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editingDocumentType={editingDocumentType}
          setEditingDocumentType={setEditingDocumentType}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<DocumentType>
        columns={columns}
        data={data?.data || []}
        total={data?.totalPages || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={handleSearch}
        isLoading={isLoading}
        actions={(item) => (
          <>
            <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="mr-2">
              <PencilIcon className="mr-1 h-4 w-4" />
              Editar
            </Button>
            {item.status ? (
              <Button variant="outline" size="sm" onClick={() => handleDelete(item)}>
                <TrashIcon className="mr-1 h-4 w-4" />
                Eliminar
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleActivate(item)}>
                <CheckIcon className="mr-1 h-4 w-4" />
                Activar
              </Button>
            )}
          </>
        )}
      />
      <DeleteDocumentType
        deletingDocumentType={deletingDocumentType}
        setDeletingDocumentType={setDeletingDocumentType}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreDocumentType
        restoreDocumentType={restoreDocumentType}
        setRestoreDocumentType={setRestoreDocumentType}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};
