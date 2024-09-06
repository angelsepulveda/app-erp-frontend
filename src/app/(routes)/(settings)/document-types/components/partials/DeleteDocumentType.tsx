'use client';

import { DocumentType } from '@/models/settings/documentType';
import { Dispatch, SetStateAction, useState } from 'react';
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
  const confirmDelete = async () => {
    if (deletingDocumentType) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/delete/${deletingDocumentType.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setIsDeleteModalOpen(false);
          setDeletingDocumentType(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          console.error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingDocumentType(null);
    }
  };

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
