import { Category } from '@/models';
import { deleteCategoryService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointCategoryDatagrid } from '../utils';

type TUseDeleteCategoryProps = {
  deletingCategory: Category | null;
  setDeletingCategory: Dispatch<SetStateAction<Category | null>>;
  mutate: ScopedMutator;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDeleteCategory = ({
  deletingCategory,
  setDeletingCategory,
  setIsDeleteModalOpen,
  mutate,
}: TUseDeleteCategoryProps) => {
  const confirmDelete = async () => {
    if (deletingCategory) {
      try {
        await deleteCategoryService(deletingCategory.id);
        toast({
          title: 'La categoría eliminada',
          description: `${deletingCategory?.name} se ha realizado correctamente la eliminación.`,
          variant: 'default',
        });
        setIsDeleteModalOpen(false);
        setDeletingCategory(null);
        await mutate(EndPointCategoryDatagrid);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error al eliminar la categoría. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingCategory(null);
    }
  };
  return {
    confirmDelete,
    handleDeleteModalOpenChange,
  };
};
