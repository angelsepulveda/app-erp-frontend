'use client';

import {
  DeleteVoucherType,
  FormVoucherType,
  RestoreVoucherType,
} from '@/app/(routes)/(settings)/voucher-types/components/partials';
import { UseVoucherTypes } from '@/app/(routes)/(settings)/voucher-types/hooks';
import { VoucherType } from '@/models';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Button, DataGrid } from '@/components';

export const VouchersTypes = () => {
  const {
    error,
    restore,
    editing,
    deleting,
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
    setEditing,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setDeleting,
    setRestore,
    handleSearch,
  } = UseVoucherTypes();

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormVoucherType
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editing={editing}
          setEditing={setEditing}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<VoucherType>
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
      <DeleteVoucherType
        deleting={deleting}
        setDeleting={setDeleting}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreVoucherType
        restore={restore}
        setRestore={setRestore}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};
