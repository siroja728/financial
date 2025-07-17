import Tabs from "@/app/admin/settings/components/Tabs";
import SystemSettings from "@/app/admin/settings/components/SystemSettings";
import HomePageSettings from "@/app/admin/settings/components/HomePageSettings";

import { getSettings } from "@/lib/api-handlers/settings";

export const metadata = {
  title: "Адмін панель - Налаштування",
  description: "Керування системними налаштуваннями",
};

async function SettingsPage() {
  const adminSettings = await getSettings({
    setting_name: "admin",
  });

  return (
    <div className="p-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Налаштування</h1>
      <Tabs
        items={[
          {
            id: "system",
            title: "Системні налаштування",
            content: <SystemSettings settings={adminSettings} />,
          },
          {
            id: "homepage",
            title: "Налаштування головної сторінки",
            content: <HomePageSettings />,
          },
        ]}
      />
    </div>
  );
}

export default SettingsPage;
