import { UseRestoreVoucherType } from '@/app/(routes)/(settings)/voucher-types/hooks';
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

type TRestoreVoucherTypeProps = {
  restore: VoucherType | null;
  setRestore: Dispatch<SetStateAction<VoucherType | null>>;
  mutate: ScopedMutator;
  isRestoreModalOpen: boolean;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RestoreVoucherType = ({
  setRestore,
  restore,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  mutate,
}: TRestoreVoucherTypeProps) => {
  const useRestore = {
    setRestore,
    restore,
    setIsRestoreModalOpen,
    mutate,
  };

  const { handleRestoreModalOpenChange, confirmRestore } = UseRestoreVoucherType(useRestore);

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleRestoreModalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar restauración</DialogTitle>
          <DialogDescription>¿Esta seguro de restaurar el tipo de comprobante: {restore?.name}?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsRestoreModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={confirmRestore}>
            Activar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
