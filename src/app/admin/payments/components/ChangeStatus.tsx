"use client";

import { updatePayment } from "@/lib/api-handlers/payments";

import Payment from "@/types/Payment";

function ChangeStatus({ payment }: { payment: Payment }) {
  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;

    try {
      await updatePayment({
        id: payment.id,
        payment: { status: newStatus },
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };
  return (
    <td className="py-2">
      <select
        name="currency"
        id="currency"
        defaultValue={payment.status}
        className={`p-2 border border-gray-300 rounded-md w-[200px] mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  ${
          payment.status === "success"
            ? "bg-green-100 text-green-800"
            : payment.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}
        onChange={handleStatusChange}
      >
        <option value="success">Успішно</option>
        <option value="pending">Очікує</option>
        <option value="failed">Не вдалося</option>
        <option value="reversed">Повернуто кошти</option>
        <option value="manual_registration">Ручна реєстрація</option>
      </select>
    </td>
  );
}

export default ChangeStatus;
