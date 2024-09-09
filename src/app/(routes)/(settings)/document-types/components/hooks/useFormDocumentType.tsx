import { DocumentType } from '@/models/settings/documentType';
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
      const url = editingDocumentType
        ? `https://localhost:7120/api/v1/document-types/update`
        : 'https://localhost:7120/api/v1/document-types/register';
      const method = editingDocumentType ? 'PUT' : 'POST';
      const body = editingDocumentType ? { ...formData, id: editingDocumentType.id } : { ...formData };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast({
          title: editingDocumentType ? 'Tipo de documento actualizado' : 'Tipo de documento registrado',
          description: `${formData.name} se ha realizado correctamente ${editingDocumentType ? 'actualizado' : 'registrado'}.`,
          variant: 'default',
        });
        setIsModalOpen(false);
        setEditingDocumentType(null);
        form.reset();
        await mutate('https://localhost:7120/api/v1/document-types/pagination');
      } else {
        toast({
          title: 'Error',
          description: `Error al ${editingDocumentType ? 'actualizar' : 'registrar'} el tipo de documento. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
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
