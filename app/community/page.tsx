
import Image from "next/image";
import CreateCommunityButton from "./component/CreateCommunityButton";
import Link from "next/link";
import { groupData } from "./component";

const groups = [
 
  {
    name: "Eternal triangle",
    type: "Public Group",
    members: "45k",
    postsPerDay: 16,
    image:"https://i.ibb.co.com/d4b7shqn/maharazbanner.png",
    icon: "🔺",
    membersImages: ["/user7.jpg", "/user8.jpg"],
    extraMembers: 12,
    buttonText: "Leave group",
    buttonColor: "bg-red-100 text-red-700",
  },
];

const membersImages = [
  "/user1.jpg",
  "/user2.jpg",
  "/user3.jpg",
  "/user4.jpg",
];

export default async function GroupList() {
  const data =await groupData("http://localhost:3000/api/community")
  console.log(data, "data")
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Group</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Alphabetical</option>
          </select>
         <CreateCommunityButton></CreateCommunityButton>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-4 flex space-x-4 text-sm">
        <span className="text-blue-600 border-b-2 border-blue-600 pb-2">Friends' groups</span>
        <span className="text-gray-600 font-semibold">Suggested for you</span>
        <span className="text-gray-600 font-semibold">Popular near you</span>
        <span className="text-gray-600 font-semibold">More suggestions</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((group, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
              <div>
              <Image src={group?.group_picture} alt={group.group_name} width={400} height={150} className="opacity-80 w-full h-32 object-cover" />
              </div>
              <div className="absolute inset-x-0 top-24 flex justify-center">
                {/* <span className="bg-white p-2 rounded-full shadow-md text-xl">{group.group_picture}</span> */}
              </div>
            </div>
            <div className="text-center pt-8 pb-4 px-4">
            <Link href={`/community/${group?.user_name}`} className="font-semibold text-lg">{group?.group_name}</Link>
              <p className="text-gray-500 text-sm">{group?.audience}</p>
              <div className="flex justify-center space-x-4 text-gray-600 text-sm mt-2">
                <span>12k Members</span>
                <span>16 Post per day</span>
              </div>
              <div className="flex justify-center -space-x-2 mt-3">
                {membersImages.map((img, idx) => (
                  <Image key={idx} src={img} alt="Member" width={32} height={32} className="rounded-full border-2 border-white" />
                ))}
                <span className="h-[32] flex items-center justify-center w-[32] bg-gray-300 text-xs rounded-full px-2 py-1"><p>
                +{group.extraMembers}</p></span>
              </div>
              <button className={`mt-4 px-4 py-1 rounded ${group.buttonColor} text-sm font-semibold`}>{group.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
