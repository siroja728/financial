"use client";

import { useState } from "react";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"system" | "homepage">("system");

  return (
    <div className="p-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Налаштування</h1>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
            activeTab === "system"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Системні налаштування
        </button>
        <button
          onClick={() => setActiveTab("homepage")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
            activeTab === "homepage"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Налаштування головної сторінки
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "system" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Системні налаштування
            </h2>
            <p className="text-gray-600">
              Тут будуть розміщені системні налаштування додатку
            </p>
          </div>
        )}

        {activeTab === "homepage" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Налаштування головної сторінки
            </h2>
            <p className="text-gray-600">
              Тут будуть розміщені налаштування текстів та контенту головної
              сторінки
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
