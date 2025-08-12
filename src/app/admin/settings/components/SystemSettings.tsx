"use client";

import { updateSettings } from "@/lib/api-handlers/settings";
import { AdminSettings } from "@/types/Settings";

function SystemSettings({ settings }: { settings: AdminSettings | null }) {
  const email = settings?.email;
  const enableLiqpay = settings?.enable_liqpay || false;
  const currency = settings?.currency || "UAH";

  const handleUpdateAdminSettings = async (settings: AdminSettings) => {
    try {
      await updateSettings({
        setting_name: "admin",
        settings,
      });
      console.log("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      throw new Error("Failed to update settings");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const enableLiqpay = (formData.get("enable_liqpay") || false) as boolean;
    const currency = formData.get("currency") as "UAH" | "USD";

    await handleUpdateAdminSettings({
      email,
      enable_liqpay: enableLiqpay,
      currency,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email (використовується для отримання листів із форми зворотного
            зв&apos;язку. Якщо не вказано то буде використовуватися email з
            налаштувань головної сторінки)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={email || ""}
            className="p-2 border border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label
            htmlFor="enable_liqpay"
            className="block text-sm font-medium text-gray-700 mt-4 flex items-center gap-2"
          >
            <input
              type="checkbox"
              name="enable_liqpay"
              id="enable_liqpay"
              defaultChecked={enableLiqpay}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
            />
            Дозволити оплату через Liqpay
          </label>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Валюта
          </label>
          <select
            name="currency"
            id="currency"
            defaultValue={currency}
            className="p-2 border border-gray-300 rounded-md w-[200px] mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}

export default SystemSettings;
