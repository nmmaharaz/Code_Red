import { collectionObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const communityCollection = await dbConnect(collectionObj.communityCollection)
    const result = await communityCollection.find({}).toArray()
    return NextResponse.json(result)
}