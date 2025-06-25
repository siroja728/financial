"use client";
import { useState } from "react";

function LiqpayPayment({ onContinue }: { onContinue: () => void }) {
  const [html, setHtml] = useState<string | null>(null);

  const handlePay = async () => {
    const res = await fetch("/api/payments/liqpay/create-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 100,
        currency: "UAH",
        description: "Оплата тренінгу від Вася Пупкіна",
        phone: "380501234567",
        email: "test@gmail.com",
        name: "Вася Пупкін",
        order_id: Date.now().toString(),
      }),
    });

    const { data, signature } = await res.json();

    const form = `
      <form method="POST" accept-charset="utf-8" target="_blank" action="https://www.liqpay.ua/api/3/checkout">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <button style="border: none !important; display:inline-block !important;text-align: center !important;padding: 5px 24px !important;
            color: #fff !important; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12); font-size:16px !important; line-height: 1.75 !important; font-weight: 600 !important; font-family: 'Open Sans', sans-serif; cursor: pointer !important; border-radius: 8px !important;
            background: #77CC5D !important;"onmouseover="this.style.opacity='0.5';" onmouseout="this.style.opacity='1';">
            <span style="vertical-align:middle; !important; margin-left: 8px !important; ">Оплатити</span>
        </button>
      </form>
    `;

    onContinue();
    setHtml(form);
  };

  return (
    <div className="pt-6">
      {!html && (
        <button
          onClick={handlePay}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition cursor-pointer"
        >
          Продовжити
        </button>
      )}
      {html && (
        <div
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}

export default LiqpayPayment;
