import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Tariff from "@/types/Tariff";

export async function getTariffs(): Promise<Tariff[]> {
  try {
    const snapshot = await getDocs(collection(db, "tariffs"));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tariff[];
  } catch (error) {
    console.error("Error getting tariffs: ", error);
    throw new Error("Failed to get tariffs");
  }
}

export async function createTariff({
  tariff,
}: {
  tariff: Omit<Tariff, "id">;
}): Promise<Tariff> {
  try {
    const docRef = await addDoc(collection(db, "tariffs"), tariff);

    return { id: docRef.id, ...tariff };
  } catch (error) {
    console.error("Error creating tariff: ", error);
    throw new Error("Failed to create tariff");
  }
}

export async function updateTariff({
  id,
  tariff,
}: {
  id: string;
  tariff: Partial<Omit<Tariff, "id">>;
}): Promise<Tariff> {
  try {
    const docRef = doc(db, "tariffs", id);
    await updateDoc(docRef, tariff);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Tariff;
  } catch (error) {
    console.error("Error updating tariff: ", error);
    throw new Error("Failed to update tariff");
  }
}

export async function getTariffById(id: string): Promise<Tariff | null> {
  try {
    const docRef = doc(db, "tariffs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Tariff;
  } catch (error) {
    console.error("Error getting tariff by ID: ", error);
    throw new Error("Failed to get tariff by ID");
  }
}

export async function deleteTariff(id: string): Promise<void> {
  try {
    const docRef = doc(db, "tariffs", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting tariff: ", error);
    throw new Error("Failed to delete tariff");
  }
}
