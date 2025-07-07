import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  getFirestore,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Tariff from "@/types/Tariff";
import Payment from "@/types/Payment";
import Review from "@/types/Review";

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

export async function createPayment({
  payment,
}: {
  payment: Omit<Payment, "id">;
}): Promise<Payment> {
  try {
    const docRef = await addDoc(collection(db, "payments"), payment);
    return { id: docRef.id, ...payment };
  } catch (error) {
    console.error("Error creating payment: ", error);
    throw new Error("Failed to create payment");
  }
}

export async function updatePayment({
  id,
  payment,
}: {
  id: string;
  payment: Partial<Omit<Payment, "id">>;
}): Promise<Payment> {
  try {
    const docRef = doc(db, "payments", id);
    await updateDoc(docRef, payment);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Payment;
  } catch (error) {
    console.error("Error updating payment: ", error);
    throw new Error("Failed to update payment");
  }
}

export async function getPaymentByOrderId(
  orderId: string
): Promise<Payment | null> {
  try {
    const q = query(
      collection(db, "payments"),
      where("order_id", "==", orderId)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];

    return { id: doc.id, ...doc.data() } as Payment;
  } catch (error) {
    console.error("Error getting payment by order ID: ", error);
    throw new Error("Failed to get payment by order ID");
  }
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

export async function getReviews(): Promise<Review[]> {
  try {
    const q = query(
      collection(db, "reviews"),
      where("show_on_landing", "==", true)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  } catch (error) {
    console.error("Error getting reviews: ", error);
    throw new Error("Failed to get reviews");
  }
}

export async function createReview({
  review,
}: {
  review: Omit<Review, "id">;
}): Promise<Review> {
  try {
    const docRef = await addDoc(collection(db, "reviews"), review);

    return { id: docRef.id, ...review };
  } catch (error) {
    console.error("Error creating review: ", error);
    throw new Error("Failed to create review");
  }
}
