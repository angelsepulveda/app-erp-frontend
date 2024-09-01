import {ReactNode} from "react";
import {PrivateLayout} from "@/components";

export default function LayoutDashboard({children}: {children: ReactNode}) {
    return <PrivateLayout>
        {children}
     </PrivateLayout>
}
