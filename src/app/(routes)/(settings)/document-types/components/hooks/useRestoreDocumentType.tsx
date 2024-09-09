import { DocumentType } from '@/models/settings/documentType';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseRestoreDocumentTypeProps = {
  restoreDocumentType: DocumentType | null;
  setRestoreDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  mutate: ScopedMutator;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useRestoreDocumentType = ({
  setRestoreDocumentType,
  setIsRestoreModalOpen,
  restoreDocumentType,
  mutate,
}: TUseRestoreDocumentTypeProps) => {
  const confirmRestore = async () => {
    if (restoreDocumentType) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/restore/${restoreDocumentType.id}`, {
          method: 'PATCH',
        });

        if (response.ok) {
          toast({
            title: 'El tipo de documento restaurado',
            description: `${restoreDocumentType?.name} se ha realizado correctamente la restauración.`,
            variant: 'default',
          });
          setIsRestoreModalOpen(false);
          setRestoreDocumentType(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          toast({
            title: 'Error',
            description: `Error al restaurar el tipo de documento. Intentelo nuevamente.`,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al restaurar el tipo de documento. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleRestoreModalOpenChange = (open: boolean) => {
    setIsRestoreModalOpen(open);
    if (!open) {
      setRestoreDocumentType(null);
    }
  };

  return {
    confirmRestore,
    handleRestoreModalOpenChange,
  };
};
