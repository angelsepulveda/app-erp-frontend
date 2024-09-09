'use client';

import { useRestoreDocumentType } from '@/app/(routes)/(settings)/document-types/components/hooks';
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
  const useRestore = {
    setRestoreDocumentType,
    restoreDocumentType,
    setIsRestoreModalOpen,
    mutate,
  };

  const { handleRestoreModalOpenChange, confirmRestore } = useRestoreDocumentType(useRestore);

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
