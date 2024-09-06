import { DocumentTypes } from '@/app/(routes)/(settings)/document-types/components';

import { CardCustom } from '@/components';

export default function DocumentTypesHome() {
  return (
    <CardCustom className="mt-8" title="Tipos de documentos">
      <DocumentTypes />
    </CardCustom>
  );
}
