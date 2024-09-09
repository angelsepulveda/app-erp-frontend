import { DocumentType } from '@/models/settings/documentType';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseDeleteDocumentTypeProps = {
  deletingDocumentType: DocumentType | null;
  setDeletingDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  mutate: ScopedMutator;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDeleteDocumentType = ({
  deletingDocumentType,
  setDeletingDocumentType,
  setIsDeleteModalOpen,
  mutate,
}: TUseDeleteDocumentTypeProps) => {
  const confirmDelete = async () => {
    if (deletingDocumentType) {
      try {
        const response = await fetch(`https://localhost:7120/api/v1/document-types/delete/${deletingDocumentType.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast({
            title: 'El tipo de documento eliminado',
            description: `${deletingDocumentType?.name} se ha realizado correctamente la eliminación.`,
            variant: 'default',
          });
          setIsDeleteModalOpen(false);
          setDeletingDocumentType(null);
          await mutate('https://localhost:7120/api/v1/document-types/pagination');
        } else {
          toast({
            title: 'Error',
            description: `Error al eliminar el tipo de documento. Intentelo nuevamente.`,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al eliminar el tipo de documento. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingDocumentType(null);
    }
  };
  return {
    confirmDelete,
    handleDeleteModalOpenChange,
  };
};
