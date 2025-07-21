import { adminDb } from "@/lib/adminFirebase";
import {
  Settings,
  AdminSettings,
  ContactInfo,
  PersonalInfo,
  HeroBlock,
  SocialLinks,
} from "@/types/Settings";

export async function getAllSettingsAdmin(): Promise<Settings> {
  const snapshot = await adminDb.collection("settings").get();
  const settings: Partial<Settings> = {};

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (doc.id === "admin") settings.admin = data as AdminSettings;
    else if (doc.id === "contact_info")
      settings.contact_info = data as ContactInfo;
    else if (doc.id === "personal_info")
      settings.personal_info = data as PersonalInfo;
    else if (doc.id === "hero_block") settings.hero_block = data as HeroBlock;
    else if (doc.id === "social_links")
      settings.social_links = data as SocialLinks;
  });

  return settings as Settings;
}
