import { collectionObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user_name: string } }
) {
  const {user_name} = await params;
  console.log(user_name, "user_name")
  const communityCollection = await dbConnect(collectionObj.communityCollection)
  const data = await communityCollection.findOne({user_name})
//   


const result = await communityCollection.aggregate([
    {
      $match: { user_name: user_name }
    },
    {
      $lookup: {
        from: "groupMember",
        localField: "user_name",
        foreignField: "user_name",
        as: "members"
      }
    },
    { $unwind: "$members"},
    {
      $lookup: {
        from: "user",
        localField: "members.member", 
        foreignField: "name",
        as: "userDetails"
      }
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        memberData: {
          accessibility: "$members.accessibility",
          name: "$userDetails.name",
          user_name:"$userDetails.user_name",
          email: "$userDetails.email",
          user_photo: "$userDetails.user_photo"
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        group_name: { $first: "$group_name" },
        group_picture: { $first: "$group_picture" },
        audience: { $first: "$audience" },
        description: { $first: "$description" },
        email: { $first: "$email" },
        user_name: { $first: "$user_name" },
        Owner: {
          $push: {
            $cond: [
              { $eq: ["$members.accessibility", "Owner"] },
              "$memberData",
              "$$REMOVE"
            ]
          }
        },
        Admin: {
          $push: {
            $cond: [
              { $eq: ["$members.accessibility", "Admin"] },
              "$memberData",
              "$$REMOVE"
            ]
          }
        },
        invited: {
          $push: {
            $cond: [
              { $eq: ["$members.accessibility", "Invited"] },
              "$memberData",
              "$$REMOVE"
            ]
          }
        },
        all_Member: {
          $push: {
            $cond: [
              { $eq: ["$members.accessibility", "Member"] },
              "$memberData",
              "$$REMOVE"
            ]
          }
        },
        request: {
          $push: {
            $cond: [
              { $eq: ["$members.accessibility", "Request"] },
              "$memberData",
              "$$REMOVE"
            ]
          }
        }
      }
    },
    {
      $project: {
        _id: 1,
        group_name: 1,
        group_picture: 1,
        audience: 1,
        description: 1,
        email: 1,
        user_name: 1,
        "Owner":"$Owner",
        "All_Admin":"$Admin",
        "Invited_members": "$invited",
        "All_Member": "$all_Member",
        "Request_members": "$request"
      }
    }
  ]
  ).toArray();

  console.log(result)
  return NextResponse.json(result)
}
