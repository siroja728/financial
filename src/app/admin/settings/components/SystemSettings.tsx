"use client";

import { updateSettings } from "@/lib/api-handlers/settings";
import { AdminSettings } from "@/types/Settings";

function SystemSettings({ settings }: { settings: AdminSettings | null }) {
  const email = settings?.email;

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

    await handleUpdateAdminSettings({ email });
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
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}

export default SystemSettings;
