"use client";
import { useState } from "react";

import { createPayment } from "@/lib/api-handlers/payments";

import Tariff from "@/types/Tariff";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tariff: Tariff | null | undefined;
  order_id: string;
  currency: "UAH" | "USD";
}

function LiqpayPayment({
  enableLiqpay = false,
  currency = "UAH",
  tariff,
  onFormSubmit = () => {},
}: {
  currency?: "UAH" | "USD";
  enableLiqpay?: boolean;
  tariff?: Tariff | null;
  onFormSubmit?: () => void;
}) {
  const [showForm, setShowForm] = useState(true);
  const [registered, setRegistered] = useState(false);

  const handleGetPaymentForm = async (formData: FormData) => {
    if (!enableLiqpay) {
      alert("Liqpay payments are not enabled.");
      return;
    }

    const res = await fetch("/api/payments/liqpay/create-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: tariff?.price,
        currency,
        description: `Оплата тарифу ${tariff?.name} від ${formData.first_name} ${formData.last_name}`,
        phone: formData.phone,
        email: formData.email,
        name: formData.first_name + " " + formData.last_name,
        order_id: formData.order_id,
      }),
    });

    const { data, signature } = await res.json();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.liqpay.ua/api/3/checkout";
    form.acceptCharset = "utf-8";
    form.target = "_blank";

    const inputData = document.createElement("input");
    inputData.type = "hidden";
    inputData.name = "data";
    inputData.value = data;

    const inputSignature = document.createElement("input");
    inputSignature.type = "hidden";
    inputSignature.name = "signature";
    inputSignature.value = signature;

    form.appendChild(inputData);
    form.appendChild(inputSignature);
    document.body.appendChild(form);
    form.submit();
    onFormSubmit();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const orderId = Date.now().toString();
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      tariff: tariff,
      order_id: orderId,
      currency: currency,
    };

    const description = enableLiqpay
      ? `Оплата тарифу "${tariff?.name}" від "${data.first_name} ${data.last_name}"`
      : `Реєстрація на тариф "${tariff?.name}" від "${data.first_name} ${data.last_name}"`;

    await createPayment({
      payment: {
        order_id: orderId,
        transaction_id: "",
        liqpay_order_id: "",
        name: data.first_name + " " + data.last_name,
        email: data.email,
        phone: data.phone,
        description,
        currency,
        amount: tariff?.price || 0,
        status: enableLiqpay ? "pending" : "manual_registration",
        payment_date: new Date().toISOString(),
      },
    });

    if (enableLiqpay) {
      setShowForm(false);
      handleGetPaymentForm(data);
    } else {
      setRegistered(true);
    }
  };

  if (registered) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Ви успішно зареєстровані!</h2>
        <p className="text-lg">
          Дякуємо за реєстрацію! Ми зв&apos;яжемося з вами найближчим часом.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-6">
      {showForm && (
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <label className="text-gray-700">
            Ваше ім&apos;я:
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
              name="first_name"
              required
            />
          </label>
          <label className="text-gray-700">
            Ваше прізвище:
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
              name="last_name"
              required
            />
          </label>
          <label className="text-gray-700">
            Email:
            <input
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
              name="email"
              required
            />
          </label>
          <label className="text-gray-700">
            Телефон:
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="Наприклад: 0501234567"
              required
            />
          </label>
          <button
            type="submit"
            className="flex-1 bg-green text-white py-2 rounded hover:bg-green-700 transition cursor-pointer text-center mt-4"
          >
            {enableLiqpay ? "Перейти до оплати" : "Зареєструватися"}
          </button>
        </form>
      )}
    </div>
  );
}

export default LiqpayPayment;
