import { EndPointVoucherTypeDatagrid } from '@/app/(routes)/(settings)/voucher-types/utils';
import { VoucherType } from '@/models';
import { registerVoucherTypeService, updateVoucherTypeService } from '@/services';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseFormVoucherTypeProps = {
  isModalOpen: boolean;
  editing: VoucherType | null;
  setEditing: Dispatch<SetStateAction<VoucherType | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const UseFormVoucherType = ({
  form,
  isModalOpen,
  setIsModalOpen,
  setEditing,
  editing,
  mutate,
}: TUseFormVoucherTypeProps) => {
  const onSubmit = async (formData: Omit<VoucherType, 'id' | 'status'>) => {
    try {
      if (editing) {
        const body = {
          ...formData,
        };
        await updateVoucherTypeService(editing.id, body);
      } else {
        const body = { ...formData };
        await registerVoucherTypeService(body);
      }
      toast({
        title: editing ? 'Tipo de comprobante actualizado' : 'Tipo de comprobante registrado',
        description: `${formData.name} se ha realizado correctamente ${editing ? 'actualizado' : 'registrado'}.`,
        variant: 'default',
      });
      setIsModalOpen(false);
      setEditing(null);
      form.reset();
      await mutate(EndPointVoucherTypeDatagrid);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error al ${editing ? 'actualizar' : 'registrar'} el tipo de comprobante. Intentelo nuevamente.`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (editing) {
      form.reset({
        name: editing.name,
        code: editing.code,
        description: editing.description,
      });
    } else {
      form.reset({
        name: '',
        code: '',
        description: '',
      });
    }
  }, [editing, form, isModalOpen]);

  return {
    onSubmit,
  };
};
