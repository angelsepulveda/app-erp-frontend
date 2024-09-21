'use client';

import { MeasurementUnit } from '@/models';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { Button, DataGrid } from '@/components';

import { useMeasurementUnit } from './hooks';
import { DeleteMeasurementUnit, FormMeasurementUnit, RestoreMeasurementUnit } from './partials';

export const MeasurementUnits = () => {
  const {
    error,
    restoreMeasurementUnit,
    editingMeasurementUnit,
    deletingMeasurementUnit,
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
    setEditingMeasurementUnit,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setIsRestoreModalOpen,
    setDeletingMeasurementUnit,
    setRestoreMeasurementUnit,
    handleSearch,
  } = useMeasurementUnit();

  if (error) return <div>Failed to load data</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <FormMeasurementUnit
          isModalOpen={isModalOpen}
          handleModalOpenChange={handleModalOpenChange}
          editingMeasurementUnit={editingMeasurementUnit}
          setEditingMeasurementUnit={setEditingMeasurementUnit}
          form={form}
          mutate={mutate}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <DataGrid<MeasurementUnit>
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
      <DeleteMeasurementUnit
        deletingMeasurementUnit={deletingMeasurementUnit}
        setDeletingMeasurementUnit={setDeletingMeasurementUnit}
        mutate={mutate}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RestoreMeasurementUnit
        restoreMeasurementUnit={restoreMeasurementUnit}
        setRestoreMeasurementUnit={setRestoreMeasurementUnit}
        mutate={mutate}
        isRestoreModalOpen={isRestoreModalOpen}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
      />
    </div>
  );
};
