'use client';

'use client';

import { Category } from '@/models';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Button, DataGrid } from '@/components';

import { useCategory } from './hooks';
import { DeleteCategory, FormCategory, RestoreCategory } from './partials';

export const Categories = () => {
  const {
    error,
    restoreCategory,
    editingCategory,
    deletingCategory,
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
    setEditingCategory,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setDeletingCategory,
    setRestoreCategory,
    handleSearch,
  } = useCategory();

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormCategory
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<Category>
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
      <DeleteCategory
        deletingCategory={deletingCategory}
        setDeletingCategory={setDeletingCategory}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreCategory
        restoreCategory={restoreCategory}
        setRestoreCategory={setRestoreCategory}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};
