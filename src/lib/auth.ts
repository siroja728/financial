import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";

export async function emailPasswordSignIn(
  email: string,
  password: string
): Promise<void> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();

  await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  window.location.reload();
}

export async function signOut(): Promise<void> {
  await auth.signOut();
  await fetch("/api/session", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  window.location.reload();
}

export async function getToken(): Promise<string | null> {
  const response = await fetch("/api/session");

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.token || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();

  return token !== null;
}
