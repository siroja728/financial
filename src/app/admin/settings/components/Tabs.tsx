"use client";

import { useState } from "react";

export interface TabProps {
  items: TabItem[];
}

export interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

function Tabs({ items }: TabProps) {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
              activeTab === item.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${
              activeTab === item.id ? "block" : "hidden"
            } p-4 bg-white rounded-lg shadow-sm`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tabs;
