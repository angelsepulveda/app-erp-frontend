import { MeasurementUnits } from '@/app/(routes)/(warehouses)/measurement-units/components';

import { CardCustom } from '@/components';

export default function MeasurementUnitsHome() {
  return (
    <CardCustom className="mt-8" title="Unidades de medidas">
      <MeasurementUnits />
    </CardCustom>
  );
}
