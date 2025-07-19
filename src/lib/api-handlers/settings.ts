import { updateDoc, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// TODO: need to refactor this function to not use `any` type
export async function getSettings({
  setting_name,
}: {
  setting_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<Record<string, any>> {
  try {
    const docRef = doc(db, "settings", setting_name);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Settings document does not exist");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return docSnap.data() as Record<string, any>;
  } catch (error) {
    console.error("Error getting settings: ", error);
    throw new Error("Failed to get settings");
  }
}

export async function getAllSettings(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, Record<string, any>>
> {
  try {
    const settingsRef = doc(db, "settings");
    const snapshot = await getDoc(settingsRef);

    if (!snapshot.exists()) {
      throw new Error("Settings document does not exist");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return snapshot.data() as Record<string, Record<string, any>>;
  } catch (error) {
    console.error("Error getting all settings: ", error);
    throw new Error("Failed to get all settings");
  }
}

// TODO: need to refactor this function to not use `any` type
export async function updateSettings({
  setting_name,
  settings,
}: {
  setting_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: Record<string, any>;
}): Promise<void> {
  try {
    const docRef = doc(db, "settings", setting_name);
    await updateDoc(docRef, settings);
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Failed to update settings");
  }
}
