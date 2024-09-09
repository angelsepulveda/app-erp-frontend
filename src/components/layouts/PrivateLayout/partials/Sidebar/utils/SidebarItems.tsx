import { Home, Settings } from 'lucide-react';

import { SidebarItemProps } from '../types';

export const sidebarItems: SidebarItemProps[] = [
  { title: 'Dashboard', icon: <Home size={20} />, href: '/' },
  {
    title: 'Configuración',
    icon: <Settings size={20} />,
    submenu: [
      { title: 'Tipos de documentos', icon: <Settings size={20} />, href: '/document-types' },
      { title: 'Tipos de comprobantes', icon: <Settings size={20} />, href: '/voucher-types' },
    ],
  },
];
