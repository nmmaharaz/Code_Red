"use client"
import axios from "axios"
import { useEffect, useState } from "react"

function useGroupUserInfo(path:string, email:string) {
    console.log("this s ldkf====>")
    const [userInfo, setUserInfo] = useState([])
    useEffect(()=>{
       const GroupUser =async()=>{
           if(email){
               const {data} = await axios(`http://localhost:3000/api/community/${email}`, {
                headers: { path },
            })
               setUserInfo(data)
           }
       }
       GroupUser()
    },[email, path])
  return userInfo
}

export default useGroupUserInfo