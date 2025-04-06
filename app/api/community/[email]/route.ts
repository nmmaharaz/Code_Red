import { collectionObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  const {
    group_name,
    user_name,
    group_picture,
    audience,
    members,
    description,
  } = await req.json();
  const userInfo = await dbConnect(collectionObj.userCollection)
  const userData = await userInfo.findOne({email})
  console.log(userData, "data returned");
  if (!userData)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  {

    console.log(userData, "userData");
    const groupMemberCollection = await dbConnect(
      collectionObj.groupMemberCollection
    );
    await groupMemberCollection.insertOne({user_name, member: userData.user_name, accessibility: "Owner"})
    members.map(async (member) => {
      await groupMemberCollection.insertOne({
        user_name,
        member,
        accessibility: "Invited",
      });
    });
  }
  const communityCollection = await dbConnect(
    collectionObj.communityCollection
  );
  const result = await communityCollection.insertOne({
    group_name,
    group_picture,
    audience,
    description,
    email,
    user_name,
  });
  return NextResponse.json(
    { message: "Community created successfully", result },
    { status: 201 }
  );
}
