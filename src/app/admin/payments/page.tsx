import { getPaymentsPaginated } from "@/lib/api-handlers/adminPayments";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const PAGE_SIZE = 10;

export default async function PaymentsPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";
  const { payments, totalCount } = await getPaymentsPaginated({
    page,
    search,
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Платежі</h1>

      <form className="mb-4 flex gap-2" method="GET">
        <input
          type="text"
          name="search"
          placeholder="Пошук..."
          defaultValue={search}
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
        >
          Шукати
        </button>
      </form>

      {/* Таблиця */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-xs text-gray-600 uppercase">
              <th className="px-4 py-2 text-left">Ім’я</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Телефон</th>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Transaction</th>
              <th className="px-4 py-2 text-left">Статус</th>
              <th className="px-4 py-2 text-left">Дата</th>
              <th className="px-4 py-2 text-left">Сума</th>
              <th className="px-4 py-2 text-left">Опис</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">
                  <a
                    href={`mailto:${p.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {p.email}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={`tel:${p.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {p.phone}
                  </a>
                </td>
                <td className="px-4 py-2">{p.order_id}</td>
                <td className="px-4 py-2">{p.transaction_id}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      p.status === "success"
                        ? "bg-green-100 text-green-800"
                        : p.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(p.payment_date).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2">{p.amount} UAH</td>
                <td className="px-4 py-2 max-w-xs truncate">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагінація */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/payments?page=${i + 1}&search=${search}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
