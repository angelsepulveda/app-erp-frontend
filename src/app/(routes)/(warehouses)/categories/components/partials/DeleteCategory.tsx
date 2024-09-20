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

import { useDeleteCategory } from '../hooks';

type TDeleteCategoryProps = {
  deletingCategory: Category | null;
  setDeletingCategory: Dispatch<SetStateAction<Category | null>>;
  mutate: ScopedMutator;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteCategory = ({
  deletingCategory,
  mutate,
  setDeletingCategory,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: TDeleteCategoryProps) => {
  const useDelete = {
    deletingCategory,
    mutate,
    setDeletingCategory,
    setIsDeleteModalOpen,
  };

  const { confirmDelete, handleDeleteModalOpenChange } = useDeleteCategory(useDelete);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>¿Esta seguro de eliminar la categoría: {deletingCategory?.name}?</DialogDescription>
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
