import UserComponent from '@/app/(routes)/User';

import { CardCustom } from '@/components';

export default function Home() {
  return (
    <CardCustom className="mt-8" title="Tipos de documentos">
      <UserComponent />
    </CardCustom>
  );
}
