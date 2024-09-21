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

import { useRestoreMeasurementUnit } from '../hooks';

type TRestoreMeasurementUnitProps = {
  restoreMeasurementUnit: MeasurementUnit | null;
  setRestoreMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  mutate: ScopedMutator;
  isRestoreModalOpen: boolean;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RestoreMeasurementUnit = ({
  setRestoreMeasurementUnit,
  restoreMeasurementUnit,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  mutate,
}: TRestoreMeasurementUnitProps) => {
  const useRestore = {
    setRestoreMeasurementUnit,
    restoreMeasurementUnit,
    setIsRestoreModalOpen,
    mutate,
  };

  const { handleRestoreModalOpenChange, confirmRestore } = useRestoreMeasurementUnit(useRestore);

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleRestoreModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar restauración</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de restaurar la unidad de medida: {restoreMeasurementUnit?.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsRestoreModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={confirmRestore}>
            Activar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
