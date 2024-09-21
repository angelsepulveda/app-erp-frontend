import { Brands } from '@/app/(routes)/(warehouses)/brands/components';

import { CardCustom } from '@/components';

export default function CategoriesHome() {
  return (
    <CardCustom className="mt-8" title="Marcas">
      <Brands />
    </CardCustom>
  );
}
