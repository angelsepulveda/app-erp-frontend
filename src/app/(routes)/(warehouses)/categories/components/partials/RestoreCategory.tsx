'use client';

import { Category } from '@/models';
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

import { useRestoreCategory } from '../hooks';

type TRestoreCategoryProps = {
  restoreCategory: Category | null;
  setRestoreCategory: Dispatch<SetStateAction<Category | null>>;
  mutate: ScopedMutator;
  isRestoreModalOpen: boolean;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RestoreCategory = ({
  setRestoreCategory,
  restoreCategory,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  mutate,
}: TRestoreCategoryProps) => {
  const useRestore = {
    setRestoreCategory,
    restoreCategory,
    setIsRestoreModalOpen,
    mutate,
  };

  const { handleRestoreModalOpenChange, confirmRestore } = useRestoreCategory(useRestore);

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleRestoreModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar restauración</DialogTitle>
          <DialogDescription>¿Esta seguro de restaurar la categoría: {restoreCategory?.name}?</DialogDescription>
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
