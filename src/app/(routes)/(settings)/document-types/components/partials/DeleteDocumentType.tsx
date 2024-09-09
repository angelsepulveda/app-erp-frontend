'use client';

import { useDeleteDocumentType } from '@/app/(routes)/(settings)/document-types/components/hooks';
import { DocumentType } from '@/models/settings/documentType';
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

type TDeleteDocumentTypeProps = {
  deletingDocumentType: DocumentType | null;
  setDeletingDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  mutate: ScopedMutator;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteDocumentType = ({
  deletingDocumentType,
  mutate,
  setDeletingDocumentType,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: TDeleteDocumentTypeProps) => {
  const useDelete = {
    deletingDocumentType,
    mutate,
    setDeletingDocumentType,
    setIsDeleteModalOpen,
  };

  const { confirmDelete, handleDeleteModalOpenChange } = useDeleteDocumentType(useDelete);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de eliminar el tipo de documento: {deletingDocumentType?.name}?
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
