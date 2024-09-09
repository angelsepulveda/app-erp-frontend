import { UseDeleteVoucherType } from '@/app/(routes)/(settings)/voucher-types/hooks';
import { VoucherType } from '@/models';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components';

type TDeleteVoucherTypeProps = {
  deleting: VoucherType | null;
  setDeleting: Dispatch<SetStateAction<VoucherType | null>>;
  mutate: ScopedMutator;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteVoucherType = ({
  deleting,
  mutate,
  setDeleting,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: TDeleteVoucherTypeProps) => {
  const useDelete = {
    deleting,
    mutate,
    setDeleting,
    setIsDeleteModalOpen,
  };

  const { confirmDelete, handleDeleteModalOpenChange } = UseDeleteVoucherType(useDelete);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleDeleteModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>¿Esta seguro de eliminar el tipo de comprobante: {deleting?.name}?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
