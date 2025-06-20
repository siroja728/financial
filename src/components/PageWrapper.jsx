"use client";

import { useAuth } from "@/context/AuthProvider";

function PageWrapper({ children }) {
  const { user, loading, authenticated } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-gray-700 mt-10">
          Ви повинні авторизуватися щоб побачити вміст сторінки. Будь
          ласка&nbsp;
          <a
            href="/login"
            className="text-green-800 hover:text-green-600 underline"
          >
            увідійти в систему
          </a>
          &nbsp; щоб продовжити.
        </p>
        <p>
          Або відвідайте&nbsp;
          <a href="/" className="text-green-800 hover:text-green-600 underline">
            головну сторінку
          </a>
          &nbsp; щоб переглянути загальнодоступний вміст.
        </p>
      </main>
    );
  }

  return <main>{children}</main>;
}

export default PageWrapper;
