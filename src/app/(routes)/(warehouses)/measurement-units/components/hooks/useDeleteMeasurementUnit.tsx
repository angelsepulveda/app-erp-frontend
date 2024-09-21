import { EndPointMeasurementUnitDatagrid } from '@/app/(routes)/(warehouses)/measurement-units/components/utils';
import { MeasurementUnit } from '@/models';
import { deleteMeasurementUnitService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

type TUseDeleteMeasurementUnitProps = {
  deletingMeasurementUnit: MeasurementUnit | null;
  setDeletingMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  mutate: ScopedMutator;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDeleteMeasurementUnit = ({
  deletingMeasurementUnit,
  setDeletingMeasurementUnit,
  setIsDeleteModalOpen,
  mutate,
}: TUseDeleteMeasurementUnitProps) => {
  const confirmDelete = async () => {
    if (deletingMeasurementUnit) {
      try {
        await deleteMeasurementUnitService(deletingMeasurementUnit.id);
        toast({
          title: 'La unidad de medida eliminada',
          description: `${deletingMeasurementUnit?.name} se ha realizado correctamente la eliminación.`,
          variant: 'default',
        });
        setIsDeleteModalOpen(false);
        setDeletingMeasurementUnit(null);
        await mutate(EndPointMeasurementUnitDatagrid);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error al eliminar la unidad de medida. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteModalOpenChange = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setDeletingMeasurementUnit(null);
    }
  };
  return {
    confirmDelete,
    handleDeleteModalOpenChange,
  };
};
