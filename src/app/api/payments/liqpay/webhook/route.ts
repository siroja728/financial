import crypto from "crypto";
import {
  updatePayment,
  getPaymentByOrderId,
} from "@/lib/api-handlers/payments";

function createSignature(data: string, privateKey: string) {
  const str = privateKey + data + privateKey;
  return crypto.createHash("sha1").update(str).digest("base64");
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = formData.get("data")?.toString();
  const signature = formData.get("signature")?.toString();

  if (!data || !signature) {
    return new Response("Invalid payload", { status: 400 });
  }

  const privateKey = process.env.LIQPAY_PRIVATE_KEY!;
  const expectedSignature = createSignature(data, privateKey);

  if (signature !== expectedSignature) {
    return new Response("Invalid signature", { status: 403 });
  }

  const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

  // ✅ handle payment success here
  console.log("LiqPay webhook:", decodedData);

  const payment = await getPaymentByOrderId(decodedData.order_id);

  console.log("Payment found:", payment);

  if (payment) {
    const updatedPayment = {
      transaction_id: decodedData.transaction_id,
      status: decodedData.status,
      payment_date: new Date().toISOString(),
    };

    await updatePayment({
      id: payment.id,
      payment: updatedPayment,
    });
  }

  return new Response("OK");
}
