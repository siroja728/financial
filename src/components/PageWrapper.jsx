import Link from "next/link";

import { isAuthenticated } from "@/lib/auth-server";

async function PageWrapper({ children }) {
  const authenticated = await isAuthenticated();

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
