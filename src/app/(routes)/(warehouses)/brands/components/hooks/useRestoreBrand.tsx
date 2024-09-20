import { Brand } from '@/models';
import { restoreBrandService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointBrandDatagrid } from '../utils';

type TUseRestoreBrandProps = {
  restoreBrand: Brand | null;
  setRestoreBrand: Dispatch<SetStateAction<Brand | null>>;
  mutate: ScopedMutator;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useRestoreBrand = ({
  setRestoreBrand,
  setIsRestoreModalOpen,
  restoreBrand,
  mutate,
}: TUseRestoreBrandProps) => {
  const confirmRestore = async () => {
    if (restoreBrand) {
      try {
        await restoreBrandService(restoreBrand.id);
        toast({
          title: 'La marca restaurada',
          description: `${restoreBrand?.name} se ha realizado correctamente la restauración.`,
          variant: 'default',
        });
        setIsRestoreModalOpen(false);
        setRestoreBrand(null);
        await mutate(EndPointBrandDatagrid);
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al restaurar la marca. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleRestoreModalOpenChange = (open: boolean) => {
    setIsRestoreModalOpen(open);
    if (!open) {
      setRestoreBrand(null);
    }
  };

  return {
    confirmRestore,
    handleRestoreModalOpenChange,
  };
};
