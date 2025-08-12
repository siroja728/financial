import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Review from "@/types/Review";

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

export async function updateReview({
  id,
  review,
}: {
  id: string;
  review: Partial<Omit<Review, "id">>;
}): Promise<Review> {
  try {
    const docRef = doc(db, "reviews", id);
    await updateDoc(docRef, review);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Review;
  } catch (error) {
    console.error("Error updating review: ", error);
    throw new Error("Failed to update review");
  }
}
