'use client';

import { Brand } from '@/models';
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

import { useRestoreBrand } from '../hooks';

type TRestoreBrandProps = {
  restoreBrand: Brand | null;
  setRestoreBrand: Dispatch<SetStateAction<Brand | null>>;
  mutate: ScopedMutator;
  isRestoreModalOpen: boolean;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RestoreBrand = ({
  setRestoreBrand,
  restoreBrand,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  mutate,
}: TRestoreBrandProps) => {
  const useRestore = {
    setRestoreBrand,
    restoreBrand,
    setIsRestoreModalOpen,
    mutate,
  };

  const { handleRestoreModalOpenChange, confirmRestore } = useRestoreBrand(useRestore);

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleRestoreModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar restauración</DialogTitle>
          <DialogDescription>¿Esta seguro de restaurar la marca: {restoreBrand?.name}?</DialogDescription>
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
