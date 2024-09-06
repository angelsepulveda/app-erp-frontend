'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import { SidebarItem } from '@/components/layouts/PrivateLayout/partials/Sidebar/partials';
import { sidebarItems } from '@/components/layouts/PrivateLayout/partials/Sidebar/utils/SidebarItems';

export const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 transform bg-[#00285E] text-white ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-30 overflow-y-auto transition duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <Image src="/LogoEmpresa.png" alt="DasSoluciones Logo" width={200} height={50} />
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
};
