import Link from "next/link";

import { AuthProvider } from "@/context/AuthProvider";
import PageWrapper from "@/components/PageWrapper";
import AdminHeader from "@/app/admin/components/AdminHeader";

import { isAuthenticated } from "@/lib/auth-server";

const Content = async ({ children }: { children: React.ReactNode }) => {
  const authenticated = await isAuthenticated();

  return (
    <>
      {authenticated ? <AdminHeader /> : null}

      <div className="flex gap-4">
        {authenticated ? (
          <aside className="md:w-[200px] bg-gray-100 min-h-screen">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin/payments"
                    className="block p-2 hover:bg-gray-200 rounded flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2 md:mr-2 mr-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span className="hidden md:block">Платежі</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/tariffs"
                    className="block p-2 hover:bg-gray-200 rounded flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2 md:mr-2 mr-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="hidden md:block">Тарифи</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        ) : null}
        <div className="flex-1">
          <PageWrapper>{children}</PageWrapper>
        </div>
      </div>
    </>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Content>{children}</Content>
    </AuthProvider>
  );
}
