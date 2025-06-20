import { getPayments } from "@/lib/firebase";

async function PaymentsPage() {
  const payments = await getPayments();
  console.log("Payments:", payments);

  return (
    <div>
      <h1>Payments Page</h1>
      <p>This is the payments page for admin users.</p>
    </div>
  );
}

export default PaymentsPage;
