'use client';

import { MeasurementUnit } from '@/models';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components';

import { useDeleteMeasurementUnit } from '../hooks';

type TDeleteMeasurementUnitProps = {
  deletingMeasurementUnit: MeasurementUnit | null;
  setDeletingMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  mutate: ScopedMutator;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteMeasurementUnit = ({
  deletingMeasurementUnit,
  mutate,
  setDeletingMeasurementUnit,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: TDeleteMeasurementUnitProps) => {
  const useDelete = {
    deletingMeasurementUnit,
    mutate,
    setDeletingMeasurementUnit,
    setIsDeleteModalOpen,
  };

  const { confirmDelete, handleDeleteModalOpenChange } = useDeleteMeasurementUnit(useDelete);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de eliminar la unidad de medida: {deletingMeasurementUnit?.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
