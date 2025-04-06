import { collectionObj, dbConnect } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req:Request, {params}:{params:{email:string}}){
     const {email} =await params
     const userCollection = await dbConnect(collectionObj.userCollection)
     const result = await userCollection.findOne({email})
     return NextResponse.json(result)
}