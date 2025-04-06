import Image from 'next/image';
import { FaCheck, FaPlus, FaEllipsisH } from 'react-icons/fa';
import GroupTab from './GroupTab';

export default function GroupHeader() {

  return (
    <div className="bg-white rounded-xl mb-6 p-6 w-full mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/apple-logo.png" alt="Apple Education" width={50} height={50} />
          <div className="ml-3">
            <h2 className="font-bold text-xl">Apple Education <span className="text-green-500">✔</span></h2>
            <p className="text-sm text-gray-500">Private group · 28.3K members</p>

            <div className="flex mt-2">
              {[...Array(4)].map((_, i) => (
                <Image key={i} src="https://placehold.co/30" alt="User Avatar" width={30} height={30} className="rounded-full border-2 border-white -ml-2 first:ml-0" />
              ))}
              <span className="text-xs text-gray-600 ml-2">+19</span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2 text-sm">
            <FaCheck /> Joined
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2 text-sm">
            <FaPlus /> Invite
          </button>
          <button className="bg-gray-200 text-gray-600 p-2 rounded-lg">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <GroupTab></GroupTab>
    </div>
  );
}
