import { Home, Settings, Users, FileText, Mail } from 'lucide-react';

import { SidebarItemProps } from '../types';

export const sidebarItems: SidebarItemProps[] = [
  { title: 'Dashboard', icon: <Home size={20} />, href: '/' },
  {
    title: 'Usuarios',
    icon: <Users size={20} />,
    submenu: [
      { title: 'Todos los Usuarios', icon: <Users size={20} />, href: '/users' },
      { title: 'Agregar Usuario', icon: <Users size={20} />, href: '/users/add' },
    ],
  },
  {
    title: 'Configuración',
    icon: <Settings size={20} />,
    submenu: [
      { title: 'General', icon: <Settings size={20} />, href: '/settings/general' },
      { title: 'Seguridad', icon: <Settings size={20} />, href: '/settings/security' },
    ],
  },
  { title: 'Reportes', icon: <FileText size={20} />, href: '/reports' },
  { title: 'Mensajes', icon: <Mail size={20} />, href: '/messages' },
];
