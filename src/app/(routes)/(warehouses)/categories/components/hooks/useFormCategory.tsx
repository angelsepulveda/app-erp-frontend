import { Category } from '@/models';
import { registerCategoryService, updateCategoryService } from '@/services';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointCategoryDatagrid } from '../utils';

type TUseFormCategoryProps = {
  isModalOpen: boolean;
  editingCategory: Category | null;
  setEditingCategory: Dispatch<SetStateAction<Category | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useFormCategory = ({
  setEditingCategory,
  editingCategory,
  setIsModalOpen,
  form,
  isModalOpen,
  mutate,
}: TUseFormCategoryProps) => {
  const onSubmit = async (formData: Omit<Category, 'id' | 'status'>) => {
    try {
      if (editingCategory) {
        const body = {
          ...formData,
        };
        await updateCategoryService(editingCategory.id, body);
      } else {
        const body = { ...formData };
        await registerCategoryService(body);
      }
      toast({
        title: editingCategory ? 'Categoría actualizado' : 'Categoría registrado',
        description: `${formData.name} se ha realizado correctamente ${editingCategory ? 'actualizado' : 'registrado'}.`,
        variant: 'default',
      });
      setIsModalOpen(false);
      setEditingCategory(null);
      form.reset();
      await mutate(EndPointCategoryDatagrid);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error al ${editingCategory ? 'actualizar' : 'registrar'} la categoría. Intentelo nuevamente.`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name,
        description: editingCategory.description,
      });
    } else {
      form.reset({
        name: '',
        description: '',
      });
    }
  }, [editingCategory, form, isModalOpen]);
  return {
    onSubmit,
  };
};
