"use client";

import { signOut } from "@/lib/auth";

function AdminHeader() {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/login"; // Redirect to home page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 w-full z-50">
      Адмін Панель
      <button className="cursor-pointer" onClick={handleSignOut}>
        <span className="text-green-800">Вийти</span>
      </button>
    </header>
  );
}

export default AdminHeader;
