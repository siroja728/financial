import Link from "next/link";

import PageWrapper from "@/components/PageWrapper";
import AdminHeader from "@/app/admin/components/AdminHeader";

const Content = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />

      <div className="flex gap-2">
        <aside className="md:w-[200px] bg-gray-100 p-2 fixed top-15 left-0 z-50 h-full">
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
              <li>
                <Link
                  href="/admin/settings"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="hidden md:block">Налаштування</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="p-2 ml-[56px] md:ml-[200px] overflow-hidden w-full">
          {children}
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
    <PageWrapper>
      <Content>{children}</Content>
    </PageWrapper>
  );
}
