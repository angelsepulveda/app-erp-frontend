import { Category } from '@/models';
import { restoreCategoryService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointCategoryDatagrid } from '../utils';

type TUseRestoreCategoryProps = {
  restoreCategory: Category | null;
  setRestoreCategory: Dispatch<SetStateAction<Category | null>>;
  mutate: ScopedMutator;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useRestoreCategory = ({
  setRestoreCategory,
  setIsRestoreModalOpen,
  restoreCategory,
  mutate,
}: TUseRestoreCategoryProps) => {
  const confirmRestore = async () => {
    if (restoreCategory) {
      try {
        await restoreCategoryService(restoreCategory.id);
        toast({
          title: 'La categoría restaurada',
          description: `${restoreCategory?.name} se ha realizado correctamente la restauración.`,
          variant: 'default',
        });
        setIsRestoreModalOpen(false);
        setRestoreCategory(null);
        await mutate(EndPointCategoryDatagrid);
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al restaurar la categoría. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleRestoreModalOpenChange = (open: boolean) => {
    setIsRestoreModalOpen(open);
    if (!open) {
      setRestoreCategory(null);
    }
  };

  return {
    confirmRestore,
    handleRestoreModalOpenChange,
  };
};
