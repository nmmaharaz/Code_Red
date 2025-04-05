import { collectionObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // const { email } = await params;
    const userCollection = await dbConnect(collectionObj.userCollection)
    const result = await userCollection.find({}).toArray()
    return NextResponse.json(result)
}