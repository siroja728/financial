import { liqpayData, liqpaySignature } from "@/lib/liqpay";
import { getSettings } from "@/lib/api-handlers/settings";

const PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;
const SERVER_URL = process.env.LIQPAY_SERVER_URL!;
const RESULT_URL = process.env.LIQPAY_RESULT_URL!;

export async function POST(req: Request) {
  const body = await req.json();
  const adminSettings = await getSettings({ setting_name: "admin" });

  const { amount, description, order_id, name, phone, email } = body;

  const params = {
    name,
    phone,
    email,
    amount,
    description,
    order_id,
    public_key: PUBLIC_KEY,
    version: "3",
    action: "pay",
    currency: adminSettings.currency,
    language: "uk",
    result_url: RESULT_URL,
    server_url: SERVER_URL,
  };

  const data = liqpayData(params);
  const signature = liqpaySignature(data, PRIVATE_KEY);

  return new Response(JSON.stringify({ data, signature }), { status: 200 });
}
