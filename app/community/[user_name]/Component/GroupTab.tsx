"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function GroupTab() {
    const [activeTab, setActiveTab] = useState("Feed");
    const pathname = usePathname() 

    const path = pathname.split("/")[2]
    const tabs = ["post", "About", "Connections", "Media", "Videos", "Events"];
  
    return (
    <div className="mt-4 border-b">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <Link href={`/community/${path}/${tab}`} 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-sm font-semibold ${
              activeTab === tab
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GroupTab;
