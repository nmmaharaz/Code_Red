import { collectionObj, dbConnect } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export async function POST (req: Request, {params}: {params: {email: string}}) {
    const {email} = await params
    const {group_name, user_name, group_picture, audience, members, description} = await req.json()
    const userData = (await dbConnect(collectionObj.userCollection)).findOne({email})
    if(!userData) return NextResponse.json({message: "User not found"}, {status: 404})
    {
        members.map(async(member)=>{
            const groupMemberCollection = await dbConnect(collectionObj.groupMemberCollection)
            const data = await groupMemberCollection.insertOne({user_name, member})
            console.log(data, "group member data")
        })
    }
    const communityCollection  = await dbConnect(collectionObj.communityCollection)
    const result = await communityCollection.insertOne({
        group_name,
        group_picture,
        audience,
        description,
        email,
        user_name
    })
    return NextResponse.json({message: "Community created successfully", result}, {status: 201})
}