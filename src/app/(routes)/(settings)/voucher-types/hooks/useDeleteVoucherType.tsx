import { EndPointVoucherTypeDatagrid } from '@/app/(routes)/(settings)/voucher-types/utils';
import { DocumentType, VoucherType } from '@/models';
import { deleteVoucherTypeService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseDeleteVoucherTypeProps = {
  deleting: DocumentType | null;
  setDeleting: Dispatch<SetStateAction<VoucherType | null>>;
  mutate: ScopedMutator;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const UseDeleteVoucherType = ({
  setDeleting,
  deleting,
  setIsDeleteModalOpen,
  mutate,
}: TUseDeleteVoucherTypeProps) => {
  const confirmDelete = async () => {
    if (deleting) {
      try {
        await deleteVoucherTypeService(deleting.id);
        toast({
          title: 'El tipo de comprobante eliminado',
          description: `${deleting?.name} se ha realizado correctamente la eliminación.`,
          variant: 'default',
        });
        setIsDeleteModalOpen(false);
        setDeleting(null);
        await mutate(EndPointVoucherTypeDatagrid);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error al eliminar el tipo de comprobante. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeleting(null);
    }
  };
  return {
    confirmDelete,
    handleDeleteModalOpenChange,
  };
};
