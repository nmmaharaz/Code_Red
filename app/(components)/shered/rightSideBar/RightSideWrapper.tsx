"use client"

import { usePathname } from "next/navigation"
import RightSideBar from "./component/RightSideBar"

function RightSideWrapper() {
    const pathname = usePathname()
    if(!(pathname === "/deshboard" || pathname === "/login" || pathname === "/signup" || pathname === "/community")) {return <RightSideBar></RightSideBar>}
}

export default RightSideWrapper