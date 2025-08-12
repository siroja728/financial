"use client";

import { updateReview } from "@/lib/api-handlers/reviews";
import Review from "@/types/Review";

function ReviewsTable({
  reviews,
  search,
}: {
  reviews: Review[];
  search: string;
}) {
  const handleCheckboxClick = async (review: Review) => {
    await updateReview({
      id: review.id,
      review: { ...review, show_on_landing: !review.show_on_landing },
    });
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Відгуки</h1>

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
              <th className="px-4 py-2 text-left">Показати на головній</th>
              <th className="px-4 py-2 text-left">Ім’я</th>
              <th className="px-4 py-2 text-left">Посада</th>
              <th className="px-4 py-2 text-left">Рейтинг</th>
              <th className="px-4 py-2 text-left">Відгук</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-2 text-center text-gray-500">
                  Немає відгуків
                </td>
              </tr>
            )}
            {reviews.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    defaultChecked={r.show_on_landing}
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleCheckboxClick(r)}
                  />
                </td>
                <td className="px-4 py-2">
                  {r.first_name} {r.last_name}
                </td>
                <td className="px-4 py-2">{r.job}</td>
                <td className="px-4 py-2">{r.rating}</td>
                <td className="px-4 py-2">{r.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewsTable;
