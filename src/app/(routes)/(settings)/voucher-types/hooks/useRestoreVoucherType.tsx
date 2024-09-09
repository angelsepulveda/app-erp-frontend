import { EndPointVoucherTypeDatagrid } from '@/app/(routes)/(settings)/voucher-types/utils';
import { DocumentType } from '@/models';
import { restoreVoucherTypeService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseRestoreVoucherTypeProps = {
  restore: DocumentType | null;
  setRestore: Dispatch<SetStateAction<DocumentType | null>>;
  mutate: ScopedMutator;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const UseRestoreVoucherType = ({
  setRestore,
  restore,
  setIsRestoreModalOpen,
  mutate,
}: TUseRestoreVoucherTypeProps) => {
  const confirmRestore = async () => {
    if (restore) {
      try {
        await restoreVoucherTypeService(restore.id);
        toast({
          title: 'El tipo de documento restaurado',
          description: `${restore?.name} se ha realizado correctamente la restauración.`,
          variant: 'default',
        });
        setIsRestoreModalOpen(false);
        setRestore(null);
        await mutate(EndPointVoucherTypeDatagrid);
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
      setRestore(null);
    }
  };

  return {
    confirmRestore,
    handleRestoreModalOpenChange,
  };
};
