import Link from "next/link";

function AdminPage() {
  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/payments"
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Платежі</h2>
          <p className="text-gray-600">Список замовлень та платежів</p>
        </Link>
        <Link
          href="/admin/tariffs"
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Тарифи</h2>
          <p className="text-gray-600">Створюйте та редагуйте тарифні плани</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
