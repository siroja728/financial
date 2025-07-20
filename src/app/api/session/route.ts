import { cookies } from "next/headers";

import { adminAuth } from "@/lib/adminFirebase";

// Set token in cookies on successful login to check if user logged in SSR component
export async function POST(request: Request) {
  const { token } = await request.json();
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return new Response(null, { status: 200 });
}

// Delete token from cookies on logout to check if user logged out SSR component
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return new Response(null, { status: 200 });
}

// Get token from cookies to check if user logged in SSR component
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    await adminAuth.verifyIdToken(token?.value || "");

    return new Response(JSON.stringify({ token: token.value }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error verifying ID token: ", error);
    return new Response(null, { status: 401 });
  }
}
