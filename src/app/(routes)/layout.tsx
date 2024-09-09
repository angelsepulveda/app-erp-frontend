import { ReactNode } from 'react';

import { PrivateLayout, Toaster } from '@/components';

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <PrivateLayout>
      {children}
      <Toaster />
    </PrivateLayout>
  );
}
