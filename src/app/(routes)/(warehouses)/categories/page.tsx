import { Categories } from '@/app/(routes)/(warehouses)/categories/components';

import { CardCustom } from '@/components';

export default function CategoriesHome() {
  return (
    <CardCustom className="mt-8" title="Categorías">
      <Categories />
    </CardCustom>
  );
}
