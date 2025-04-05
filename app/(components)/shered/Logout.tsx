"use client"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

function Logout() {
  return (
    <div>
        <button onClick={()=>signOut()}>
        <LogOut></LogOut>
        </button>
    </div>
  )
}

export default Logout