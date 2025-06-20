import { cookies } from "next/headers";

// TODO: Need to verify token with firebase admin SDK
export async function isAuthenticated() {
  const firebaseToken = (await cookies()).get("token")?.value || "";
  return Boolean(firebaseToken);
}
