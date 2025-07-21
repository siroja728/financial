import { adminDb } from "@/lib/adminFirebase";
import Payment from "@/types/Payment";

const PAGE_SIZE = 10;

export async function getPaymentsPaginated({
  page = 1,
  search = "",
  pageSize = PAGE_SIZE,
}: {
  page?: number;
  search?: string;
  pageSize?: number;
}): Promise<{ payments: Payment[]; hasMore: boolean; totalCount: number }> {
  const offset = (page - 1) * pageSize;

  const ref = adminDb.collection("payments").orderBy("payment_date", "desc");

  const allSnapshot = await ref.get();
  const allDocs = allSnapshot.docs;

  // простий пошук (на боці сервера) — по name/email/phone/order_id
  const filteredDocs = search
    ? allDocs.filter((doc) => {
        const data = doc.data();
        return (
          data.name?.toLowerCase().includes(search.toLowerCase()) ||
          data.email?.toLowerCase().includes(search.toLowerCase()) ||
          data.phone?.includes(search) ||
          data.order_id?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : allDocs;

  const paginated = filteredDocs.slice(offset, offset + pageSize);

  const payments = paginated.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Payment[];

  return {
    payments,
    hasMore: offset + pageSize < filteredDocs.length,
    totalCount: filteredDocs.length,
  };
}
