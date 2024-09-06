'use client';

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

type TRestoreDocumentTypeProps = {
  restoreDocumentType: DocumentType | null;
  setRestoreDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  mutate: ScopedMutator;
  isRestoreModalOpen: boolean;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RestoreDocumentType = ({
  setRestoreDocumentType,
  restoreDocumentType,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  mutate,
}: TRestoreDocumentTypeProps) => {
  const confirmRestore = async () => {
    if (restoreDocumentType) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/restore/${restoreDocumentType.id}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          setIsRestoreModalOpen(false);
          setRestoreDocumentType(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          console.error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleRestoreModalOpenChange = (open: boolean) => {
    setIsRestoreModalOpen(open);
    if (!open) {
      setRestoreDocumentType(null);
    }
  };

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleRestoreModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar restauración</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de restaurar el tipo de documento: {restoreDocumentType?.name}?
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
