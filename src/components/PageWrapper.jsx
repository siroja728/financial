"use client";
import Link from "next/link";

import { useAuth } from "@/context/AuthProvider";

function PageWrapper({ children }) {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
        <div className="bg-white p-6">
          <p className="text-lg font-medium">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Доступ заборонено</h1>
          <p className="mb-4">
            Ви повинні увійти в систему, щоб отримати доступ до цієї сторінки.
          </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Увійти
          </Link>
        </div>
      </div>
    );
  }

  return <main>{children}</main>;
}

export default PageWrapper;
