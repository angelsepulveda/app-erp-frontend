'use client'

import Link from 'next/link'
import {SidebarItemProps} from "@/components/layouts/PrivateLayout/partials/Sidebar/types";
import {useState} from "react";
import {
    ChevronDown,
    ChevronUp,
} from 'lucide-react'

export const SidebarItem = ({item}: { item: SidebarItemProps }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    if (item.submenu) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-[#00C4FF] hover:text-[#070708] transition-colors"
                >
          <span className="flex items-center">
            {item.icon}
              <span className="ml-2">{item.title}</span>
          </span>
                    {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
                {isOpen && (
                    <div className="ml-4">
                        {item.submenu.map((subItem, index) => (
                            <SidebarItem key={index} item={subItem}/>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <Link href={item.href || '#'}
              className="flex items-center px-4 py-2 text-white hover:bg-[#00C4FF] hover:text-[#070708] transition-colors">
            {item.icon}
            <span className="ml-2">{item.title}</span>
        </Link>
    )
}
