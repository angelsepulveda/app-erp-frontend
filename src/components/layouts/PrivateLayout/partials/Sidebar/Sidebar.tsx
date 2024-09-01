'use client'

import {sidebarItems} from "@/components/layouts/PrivateLayout/partials/Sidebar/utils/SidebarItems";
import {SidebarItem} from "@/components/layouts/PrivateLayout/partials/Sidebar/partials";
import Image from 'next/image'
import {X} from "lucide-react";

export const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
    return (
    <>
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`}
            onClick={toggleSidebar}
        ></div>
        <div className={`bg-[#00285E] text-white w-64 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 overflow-y-auto`}>
            <div className="flex items-center justify-between p-4">
                <Image
                    src="/LogoEmpresa.png"
                    alt="DasSoluciones Logo"
                    width={200}
                    height={50}
                />
                <button onClick={toggleSidebar} className="md:hidden text-white">
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
    )
}
