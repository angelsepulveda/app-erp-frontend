import { Home, Settings, Warehouse } from 'lucide-react';

import { SidebarItemProps } from '../types';

export const sidebarItems: SidebarItemProps[] = [
  { title: 'Dashboard', icon: <Home size={20} />, href: '/' },
  {
    title: 'Almacenes',
    icon: <Warehouse size={20} />,
    submenu: [
      { title: 'Categorías', icon: <Warehouse size={20} />, href: '/categories' },
      { title: 'Marcas', icon: <Warehouse size={20} />, href: '/brands' },
    ],
  },
  {
    title: 'Configuración',
    icon: <Settings size={20} />,
    submenu: [
      { title: 'Tipos de documentos', icon: <Settings size={20} />, href: '/document-types' },
      { title: 'Tipos de comprobantes', icon: <Settings size={20} />, href: '/voucher-types' },
    ],
  },
];
