import { MeasurementUnit } from '@/models';
import { restoreMeasurementUnitService } from '@/services';
import { Dispatch, SetStateAction } from 'react';
import { ScopedMutator } from 'swr/_internal';

import { toast } from '@/components/hooks/use-toast';

import { EndPointMeasurementUnitDatagrid } from '../utils';

type TUseRestoreMeasurementUnitProps = {
  restoreMeasurementUnit: MeasurementUnit | null;
  setRestoreMeasurementUnit: Dispatch<SetStateAction<MeasurementUnit | null>>;
  mutate: ScopedMutator;
  setIsRestoreModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useRestoreMeasurementUnit = ({
  setRestoreMeasurementUnit,
  setIsRestoreModalOpen,
  restoreMeasurementUnit,
  mutate,
}: TUseRestoreMeasurementUnitProps) => {
  const confirmRestore = async () => {
    if (restoreMeasurementUnit) {
      try {
        await restoreMeasurementUnitService(restoreMeasurementUnit.id);
        toast({
          title: 'La unidad de medida restaurada',
          description: `${restoreMeasurementUnit?.name} se ha realizado correctamente la restauración.`,
          variant: 'default',
        });
        setIsRestoreModalOpen(false);
        setRestoreMeasurementUnit(null);
        await mutate(EndPointMeasurementUnitDatagrid);
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al restaurar la unidad de medida. Intentelo nuevamente.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleRestoreModalOpenChange = (open: boolean) => {
    setIsRestoreModalOpen(open);
    if (!open) {
      setRestoreMeasurementUnit(null);
    }
  };

  return {
    confirmRestore,
    handleRestoreModalOpenChange,
  };
};
