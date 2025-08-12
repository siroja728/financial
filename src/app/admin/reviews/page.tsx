import Link from "next/link";
import {
  getReviewsPaginated,
  updateReview,
} from "@/lib/api-handlers/adminReviews";
import Review from "@/types/Review";

import ReviewsTable from "@/app/admin/reviews/components/ReviewsTable";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

const PAGE_SIZE = 10;

export default async function PaymentsPage({ searchParams }: Props) {
  const { page, search } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  const { reviews, totalCount } = await getReviewsPaginated({
    page: currentPage,
    search: search || "",
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <ReviewsTable search={search || ""} reviews={reviews} />
      <div className="flex gap-2 mt-6">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/admin/payments?page=${i + 1}&search=${search || ""}`}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
      </div>
    </>
  );
}
