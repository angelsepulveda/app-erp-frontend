import { Brand } from '@/models';
import { deleteBrandService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointBrandDatagrid } from '../utils';

type TUseDeleteBrandProps = {
  deletingBrand: Brand | null;
  setDeletingBrand: Dispatch<SetStateAction<Brand | null>>;
  mutate: ScopedMutator;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDeleteBrand = ({
  deletingBrand,
  setDeletingBrand,
  setIsDeleteModalOpen,
  mutate,
}: TUseDeleteBrandProps) => {
  const confirmDelete = async () => {
    if (deletingBrand) {
      try {
        await deleteBrandService(deletingBrand.id);
        toast({
          title: 'La marca eliminada',
          description: `${deletingBrand?.name} se ha realizado correctamente la eliminación.`,
          variant: 'default',
        });
        setIsDeleteModalOpen(false);
        setDeletingBrand(null);
        await mutate(EndPointBrandDatagrid);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error al eliminar la marca. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingBrand(null);
    }
  };
  return {
    confirmDelete,
    handleDeleteModalOpenChange,
  };
};
