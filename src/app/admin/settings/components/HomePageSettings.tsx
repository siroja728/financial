"use client";

import {
  HeroBlock,
  PersonalInfo,
  ContactInfo,
  SocialLinks,
  Settings,
} from "@/types/Settings";
import { updateSettings } from "@/lib/api-handlers/settings";

function HomePageSettings({ settings }: { settings: Settings }) {
  const {
    hero_block: heroBlock,
    personal_info: personalInfo,
    contact_info: contactInfo,
    social_links: socialLinks,
  } = settings;

  const handleUpdateContactInfo = async (data: ContactInfo) => {
    try {
      await updateSettings({
        setting_name: "contact_info",
        settings: data,
      });
      alert("Contact info updated successfully!");
    } catch (error) {
      console.error("Error updating contact info:", error);
      alert("Failed to update contact info.");
    }
  };

  const handleUpdateSocialLinks = async (data: SocialLinks) => {
    try {
      await updateSettings({
        setting_name: "social_links",
        settings: data,
      });
      alert("Social links updated successfully!");
    } catch (error) {
      console.error("Error updating social links:", error);
      alert("Failed to update social links.");
    }
  };

  const handleUpdateHeroBlock = async (data: HeroBlock) => {
    try {
      await updateSettings({
        setting_name: "hero_block",
        settings: data,
      });
      alert("Hero block settings updated successfully!");
    } catch (error) {
      console.error("Error updating hero block settings:", error);
      alert("Failed to update hero block settings.");
    }
  };

  const handleUpdatePersonalInfo = async (data: PersonalInfo) => {
    try {
      await updateSettings({
        setting_name: "personal_info",
        settings: data,
      });
      alert("Personal info updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
      alert("Failed to update personal info.");
    }
  };

  const handleSubmitHeroBlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: HeroBlock = {
      main_text: formData.get("main_text") as string,
      sub_text: formData.get("sub_text") as string,
    };
    handleUpdateHeroBlock(data);
  };

  const handleSubmitPersonalInfo = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: PersonalInfo = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      about_me: formData.get("about_me") as string,
    };
    handleUpdatePersonalInfo(data);
  };

  const handleSubmitContactInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: ContactInfo = {
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };
    handleUpdateContactInfo(data);
  };

  const handleSubmitSocialLinks = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SocialLinks = {
      facebook: formData.get("facebook") as string,
      twitter: formData.get("twitter") as string,
      instagram: formData.get("instagram") as string,
      youtube: formData.get("youtube") as string,
      telegram: formData.get("telegram") as string,
      whatsapp: formData.get("whatsapp") as string,
      viber: formData.get("viber") as string,
      tiktok: formData.get("tiktok") as string,
    };
    handleUpdateSocialLinks(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">Налаштування головного блоку</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitHeroBlock}>
        <label className="text-gray-700">Головний текст</label>
        <textarea
          className="border border-gray-300 p-2 rounded-md h-[100px]"
          name="main_text"
          defaultValue={heroBlock?.main_text}
        />
        <label className="text-gray-700">Підзаголовок</label>
        <textarea
          className="border border-gray-300 p-2 rounded-md h-[100px]"
          name="sub_text"
          defaultValue={heroBlock?.sub_text}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-[150px] text-center cursor-pointer self-end"
        >
          Зберегти
        </button>
      </form>
      <hr className="my-6 border-gray-300" />
      <h1 className="text-2xl font-bold mb-4">Особиста інформація</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitPersonalInfo}>
        <label className="text-gray-700">Прізвище</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          name="last_name"
          defaultValue={personalInfo?.last_name}
        />
        <label className="text-gray-700">Ім&apos;я</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          name="first_name"
          defaultValue={personalInfo?.first_name}
        />
        <label className="text-gray-700">Про мене</label>
        <textarea
          className="border border-gray-300 p-2 rounded-md h-[100px]"
          name="about_me"
          defaultValue={personalInfo?.about_me}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-[150px] text-center cursor-pointer self-end"
        >
          Зберегти
        </button>
      </form>
      <hr className="my-6 border-gray-300" />
      <h1 className="text-2xl font-bold mb-4">Контактна інформація</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitContactInfo}>
        <label className="text-gray-700">Email</label>
        <input
          type="email"
          className="border border-gray-300 p-2 rounded-md"
          name="email"
          defaultValue={contactInfo?.email}
        />
        <label className="text-gray-700">Телефон</label>
        <input
          type="tel"
          className="border border-gray-300 p-2 rounded-md"
          name="phone"
          defaultValue={contactInfo?.phone}
        />
        <label className="text-gray-700">Адреса</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          name="address"
          defaultValue={contactInfo?.address}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-[150px] text-center cursor-pointer self-end"
        >
          Зберегти
        </button>
      </form>
      <hr className="my-6 border-gray-300" />
      <h1 className="text-2xl font-bold mb-4">Соціальні посилання</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitSocialLinks}>
        <label className="text-gray-700">Facebook</label>
        <input
          type="url"
          className="border border-gray-300 p-2 rounded-md"
          name="facebook"
          defaultValue={socialLinks?.facebook}
        />
        <label className="text-gray-700">Instagram</label>
        <input
          type="url"
          className="border border-gray-300 p-2 rounded-md"
          name="instagram"
          defaultValue={socialLinks?.instagram}
        />
        <label className="text-gray-700">YouTube</label>
        <input
          type="url"
          className="border border-gray-300 p-2 rounded-md"
          name="youtube"
          defaultValue={socialLinks?.youtube}
        />
        <label className="text-gray-700">Telegram</label>
        <input
          type="url"
          className="border border-gray-300 p-2 rounded-md"
          name="telegram"
          defaultValue={socialLinks?.telegram}
        />
        <label className="text-gray-700">TikTok</label>
        <input
          type="url"
          className="border border-gray-300 p-2 rounded-md"
          name="tiktok"
          defaultValue={socialLinks?.tiktok}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-[150px] text-center cursor-pointer self-end"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}

export default HomePageSettings;
