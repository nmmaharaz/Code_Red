"use client"
import { useSession } from "next-auth/react"
// import BlogPost from "./Post/BlogPost"
import CreatePost from "./Blog/CreatePost"

function Main() {
    const {data} =  useSession()
    console.log(data, "data")
  return (
    <div className="text-center text-2xl font-bold text-gray-800">
        <CreatePost></CreatePost>
        {/* <BlogPost></BlogPost> */}
    </div>
  )
}

export default Main