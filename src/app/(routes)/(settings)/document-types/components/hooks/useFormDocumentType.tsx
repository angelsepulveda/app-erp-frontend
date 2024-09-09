import { EndPointDocumentTypeDatagrid } from '@/app/(routes)/(settings)/document-types/components/utils';
import { DocumentType } from '@/models/settings/documentType';
import { registerDocumentTypeService, updateDocumentTypeService } from '@/services/settings/useService';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseFormDocumentTypeProps = {
  isModalOpen: boolean;
  editingDocumentType: DocumentType | null;
  setEditingDocumentType: Dispatch<SetStateAction<DocumentType | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useFormDocumentType = ({
  setEditingDocumentType,
  editingDocumentType,
  setIsModalOpen,
  form,
  isModalOpen,
  mutate,
}: TUseFormDocumentTypeProps) => {
  const onSubmit = async (formData: Omit<DocumentType, 'id' | 'status'>) => {
    try {
      if (editingDocumentType) {
        const body = {
          ...formData,
        };
        await updateDocumentTypeService(editingDocumentType.id, body);
      } else {
        const body = { ...formData };
        await registerDocumentTypeService(body);
      }
      toast({
        title: editingDocumentType ? 'Tipo de documento actualizado' : 'Tipo de documento registrado',
        description: `${formData.name} se ha realizado correctamente ${editingDocumentType ? 'actualizado' : 'registrado'}.`,
        variant: 'default',
      });
      setIsModalOpen(false);
      setEditingDocumentType(null);
      form.reset();
      await mutate(EndPointDocumentTypeDatagrid);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error al ${editingDocumentType ? 'actualizar' : 'registrar'} el tipo de documento. Intentelo nuevamente.`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (editingDocumentType) {
      form.reset({
        name: editingDocumentType.name,
        code: editingDocumentType.code,
        description: editingDocumentType.description,
      });
    } else {
      form.reset({
        name: '',
        code: '',
        description: '',
      });
    }
  }, [editingDocumentType, form, isModalOpen]);
  return {
    onSubmit,
  };
};
