import {
  updateDoc,
  getDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  AdminSettings,
  ContactInfo,
  HeroBlock,
  SocialLinks,
  PersonalInfo,
  Settings,
} from "@/types/Settings";

export async function getSettings({
  setting_name,
}: {
  setting_name: string;
}): Promise<AdminSettings> {
  try {
    const docRef = doc(db, "settings", setting_name);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Settings document does not exist");
    }

    const data = docSnap.data();

    if (!data || typeof data.email !== "string") {
      throw new Error("Invalid settings data structure");
    }

    return data as AdminSettings;
  } catch (error) {
    console.error("Error getting settings: ", error);
    throw new Error("Failed to get settings");
  }
}

export async function getAllSettings(): Promise<Settings> {
  try {
    const colRef = collection(db, "settings");
    const snapshot = await getDocs(colRef);

    const settings: Partial<Settings> = {};

    snapshot.docs.forEach((doc) => {
      const docId = doc.id;
      const docData = doc.data();

      if (docId === "admin") {
        settings.admin = docData as AdminSettings;
      } else if (docId === "contact_info") {
        settings.contact_info = docData as ContactInfo;
      } else if (docId === "personal_info") {
        settings.personal_info = docData as PersonalInfo;
      } else if (docId === "hero_block") {
        settings.hero_block = docData as HeroBlock;
      } else if (docId === "social_links") {
        settings.social_links = docData as SocialLinks;
      }
    });

    return settings as Settings;
  } catch (error) {
    console.error("Error getting all settings: ", error);
    throw new Error("Failed to get all settings");
  }
}

export async function updateSettings({
  setting_name,
  settings,
}: {
  setting_name: string;
  settings:
    | AdminSettings
    | ContactInfo
    | HeroBlock
    | SocialLinks
    | PersonalInfo;
}): Promise<void> {
  try {
    const docRef = doc(db, "settings", setting_name);
    await updateDoc(
      docRef,
      settings as {
        [x: string]:
          | AdminSettings
          | ContactInfo
          | HeroBlock
          | SocialLinks
          | PersonalInfo;
      }
    );
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Failed to update settings");
  }
}
