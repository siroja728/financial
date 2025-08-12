import { adminDb } from "@/lib/adminFirebase";
import Review from "@/types/Review";

const PAGE_SIZE = 10;

export async function getReviewsPaginated({
  page = 1,
  search = "",
  pageSize = PAGE_SIZE,
}: {
  page?: number;
  search?: string;
  pageSize?: number;
}): Promise<{ reviews: Review[]; hasMore: boolean; totalCount: number }> {
  const offset = (page - 1) * pageSize;

  const ref = adminDb.collection("reviews");

  const allSnapshot = await ref.get();
  const allDocs = allSnapshot.docs;
  const filteredDocs = search
    ? allDocs.filter((doc) => {
        const data = doc.data();
        return (
          data.first_name?.toLowerCase().includes(search.toLowerCase()) ||
          data.last_name?.toLowerCase().includes(search.toLowerCase()) ||
          data.review?.toLowerCase().includes(search.toLowerCase()) ||
          data.job?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : allDocs;

  const paginated = filteredDocs.slice(offset, offset + pageSize);

  const reviews = paginated.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];

  return {
    reviews,
    hasMore: offset + pageSize < filteredDocs.length,
    totalCount: filteredDocs.length,
  };
}

export async function updateReview({
  id,
  review,
}: {
  id: string;
  review: Partial<Review>;
}): Promise<Review> {
  try {
    const docRef = adminDb.collection("reviews").doc(id);
    await docRef.update(review);

    return { id, ...review } as Review;
  } catch (error) {
    console.error("Error updating review: ", error);
    throw new Error("Failed to update review");
  }
}
