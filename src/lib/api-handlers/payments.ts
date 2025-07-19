import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  updateDoc,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Payment from "@/types/Payment";

export async function getPayments(): Promise<Payment[]> {
  const paymentsRef = collection(db, "payments");
  const q = query(paymentsRef, orderBy("payment_date", "desc"));

  const snapshot = await getDocs(q);

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
