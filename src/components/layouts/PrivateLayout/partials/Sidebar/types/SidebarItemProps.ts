import { ReactNode } from "react";

export type SidebarItemProps = {
    title: string
    icon: ReactNode
    href?: string
    submenu?: SidebarItemProps[]
}
