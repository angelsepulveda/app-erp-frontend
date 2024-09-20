'use client';

'use client';

import { useBrand } from '@/app/(routes)/(warehouses)/brands/components/hooks';
import { Brand } from '@/models';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Button, DataGrid } from '@/components';

import { DeleteBrand, FormBrand, RestoreBrand } from './partials';

export const Brands = () => {
  const {
    error,
    restoreBrand,
    editingBrand,
    deletingBrand,
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
    setEditingBrand,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setDeletingBrand,
    setRestoreBrand,
    handleSearch,
  } = useBrand();

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormBrand
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editingBrand={editingBrand}
          setEditingBrand={setEditingBrand}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<Brand>
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
      <DeleteBrand
        deletingBrand={deletingBrand}
        setDeletingBrand={setDeletingBrand}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreBrand
        restoreBrand={restoreBrand}
        setRestoreBrand={setRestoreBrand}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};
