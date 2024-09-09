import { EndPointDocumentTypeDatagrid } from '@/app/(routes)/(settings)/document-types/components/utils';
import { DocumentType } from '@/models/settings/documentType';
import { deleteDocumentTypeService } from '@/services/settings/documentTypeService';
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
        await deleteDocumentTypeService(deletingDocumentType.id);
        toast({
          title: 'El tipo de documento eliminado',
          description: `${deletingDocumentType?.name} se ha realizado correctamente la eliminación.`,
          variant: 'default',
        });
        setIsDeleteModalOpen(false);
        setDeletingDocumentType(null);
        await mutate(EndPointDocumentTypeDatagrid);
      } catch (error) {
        console.log(error);
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
