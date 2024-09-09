import { VouchersTypes } from '@/app/(routes)/(settings)/voucher-types/components';

import { CardCustom } from '@/components';

export default function Home() {
  return (
    <CardCustom className="mt-8" title="Tipos de comprobantes">
      <VouchersTypes />
    </CardCustom>
  );
}
