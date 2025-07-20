import { cookies } from "next/headers";

import { adminAuth } from "@/lib/adminAuth";

export async function isAuthenticated() {
  try {
    const firebaseToken = (await cookies()).get("token")?.value || "";

    if (!firebaseToken) {
      return false;
    }

    const user = await adminAuth.verifyIdToken(firebaseToken);

    return Boolean(user);
  } catch (e) {
    console.error("Authentication error: ", e);
    return false;
  }
}
