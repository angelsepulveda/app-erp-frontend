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

import { useDeleteBrand } from '../hooks';

type TDeleteBrandProps = {
  deletingBrand: Brand | null;
  setDeletingBrand: Dispatch<SetStateAction<Brand | null>>;
  mutate: ScopedMutator;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteBrand = ({
  deletingBrand,
  mutate,
  setDeletingBrand,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: TDeleteBrandProps) => {
  const useDelete = {
    deletingBrand,
    mutate,
    setDeletingBrand,
    setIsDeleteModalOpen,
  };

  const { confirmDelete, handleDeleteModalOpenChange } = useDeleteBrand(useDelete);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>¿Esta seguro de eliminar la marca: {deletingBrand?.name}?</DialogDescription>
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
