"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar";

function NavbarWrapper() {
    const pathname = usePathname()
    if (pathname === "/deshboard") return null;

  return <Navbar></Navbar>
}

export default NavbarWrapper