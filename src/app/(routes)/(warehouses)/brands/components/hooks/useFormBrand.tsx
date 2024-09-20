import { EndPointBrandDatagrid } from '@/app/(routes)/(warehouses)/brands/components/utils';
import { Brand } from '@/models';
import { registerBrandService, updateBrandService } from '@/services';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseFormBrandProps = {
  isModalOpen: boolean;
  editingBrand: Brand | null;
  setEditingBrand: Dispatch<SetStateAction<Brand | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useFormBrand = ({
  setEditingBrand,
  editingBrand,
  setIsModalOpen,
  form,
  isModalOpen,
  mutate,
}: TUseFormBrandProps) => {
  const onSubmit = async (formData: Omit<Brand, 'id' | 'status'>) => {
    try {
      if (editingBrand) {
        const body = {
          ...formData,
        };
        await updateBrandService(editingBrand.id, body);
      } else {
        const body = { ...formData };
        await registerBrandService(body);
      }
      toast({
        title: editingBrand ? 'Marca actualizado' : 'Marca registrado',
        description: `${formData.name} se ha realizado correctamente ${editingBrand ? 'actualizado' : 'registrado'}.`,
        variant: 'default',
      });
      setIsModalOpen(false);
      setEditingBrand(null);
      form.reset();
      await mutate(EndPointBrandDatagrid);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error al ${editingBrand ? 'actualizar' : 'registrar'} la marca. Intentelo nuevamente.`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (editingBrand) {
      form.reset({
        name: editingBrand.name,
        description: editingBrand.description,
      });
    } else {
      form.reset({
        name: '',
        description: '',
      });
    }
  }, [editingBrand, form, isModalOpen]);
  return {
    onSubmit,
  };
};
