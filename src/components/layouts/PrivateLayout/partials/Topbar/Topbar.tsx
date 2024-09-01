'use client'

import {Bell, ChevronDown, LogOut, Menu, Search, User} from "lucide-react";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input
} from "@/components";
import {useState} from "react";

export const TopBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const [showSearch, setShowSearch] = useState<boolean>(false)

    return (
        <div className="bg-white shadow-md h-16 flex items-center justify-between px-4 relative z-20">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-[#00285E] focus:outline-none focus:text-[#00C4FF] md:hidden">
                    <Menu size={24} />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-8 pr-4 py-2 rounded-full border-[#00285E] focus:border-[#00C4FF] focus:ring focus:ring-[#00C4FF] focus:ring-opacity-50"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00285E]" size={18} />
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="md:hidden text-[#00285E] hover:text-[#00C4FF]"
                    onClick={() => setShowSearch(!showSearch)}
                >
                    <Search size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-[#00285E] hover:text-[#00C4FF]">
                    <Bell size={20} />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-8 px-2 flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0"
                        >
                            <User className="h-5 w-5 text-[#00285E] mr-2" />
                            <span className="text-[#00285E] hidden md:inline">Juan Pérez</span>
                            <ChevronDown className="ml-2 h-4 w-4 text-[#00285E]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Juan Pérez</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    juan.perez@dassoluciones.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Ver perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#DC2828]">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Cerrar sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {showSearch && (
                <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-md md:hidden">
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full pl-8 pr-4 py-2 rounded-full border-[#00285E] focus:border-[#00C4FF] focus:ring focus:ring-[#00C4FF] focus:ring-opacity-50"
                    />
                    <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-[#00285E]" size={18} />
                </div>
            )}
        </div>
    )
}
