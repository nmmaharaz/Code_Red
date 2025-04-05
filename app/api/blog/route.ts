import { collectionObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.json();
    const blogCollection = await dbConnect(collectionObj.blogCollection);
    await blogCollection.insertOne(data);
    return NextResponse.json({success: true, message: "Blog post created successfully"}, {status: 200});
}