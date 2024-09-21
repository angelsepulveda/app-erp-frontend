import { MeasurementUnit } from '@/models';
import { registerMeasurementUnitService, updateMeasurementUnitService } from '@/services';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointMeasurementUnitDatagrid } from '../utils';

type TUseFormMeasurementUnitProps = {
  isModalOpen: boolean;
  editingMeasurementUnit: MeasurementUnit | null;
  setEditingMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  form: UseFormReturn<any, any>;
  mutate: ScopedMutator;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useFormMeasurementUnit = ({
  setEditingMeasurementUnit,
  editingMeasurementUnit,
  setIsModalOpen,
  form,
  isModalOpen,
  mutate,
}: TUseFormMeasurementUnitProps) => {
  const onSubmit = async (formData: Omit<MeasurementUnit, 'id' | 'status'>) => {
    try {
      if (editingMeasurementUnit) {
        const body = {
          ...formData,
        };
        await updateMeasurementUnitService(editingMeasurementUnit.id, body);
      } else {
        const body = { ...formData };
        await registerMeasurementUnitService(body);
      }
      toast({
        title: editingMeasurementUnit ? 'Unidad de medida actualizado' : 'Unidad de medida registrado',
        description: `${formData.name} se ha realizado correctamente ${editingMeasurementUnit ? 'actualizado' : 'registrado'}.`,
        variant: 'default',
      });
      setIsModalOpen(false);
      setEditingMeasurementUnit(null);
      form.reset();
      await mutate(EndPointMeasurementUnitDatagrid);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error al ${editingMeasurementUnit ? 'actualizar' : 'registrar'} la unidad de medida. Intentelo nuevamente.`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (editingMeasurementUnit) {
      form.reset({
        name: editingMeasurementUnit.name,
        prefix: editingMeasurementUnit.prefix,
        description: editingMeasurementUnit.description,
      });
    } else {
      form.reset({
        name: '',
        description: '',
      });
    }
  }, [editingMeasurementUnit, form, isModalOpen]);
  return {
    onSubmit,
  };
};
