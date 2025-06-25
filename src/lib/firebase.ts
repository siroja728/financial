import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";

import Tariff from "@/types/Tariff";
import Payment from "@/types/Payment";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

export async function getPayments(): Promise<Payment[]> {
  const snapshot = await getDocs(collection(db, "payments"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Payment[];
}

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
