import { Resend } from "resend";
import { NextResponse } from "next/server";

import { getSettings } from "@/lib/api-handlers/settings";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const contactInfo = await getSettings({ setting_name: "contact_info" });
  const adminSettings = await getSettings({ setting_name: "admin" });
  const { email: adminEmail } = adminSettings;
  const { email } = contactInfo;
  const { subject, html, sender_email } = await request.json();

  if (!subject || !html) {
    return NextResponse.json(
      { error: "Missing required fields: to, subject, html" },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "noreply@vr-invest.ck.ua",
      to: adminEmail || email,
      subject: `Форма зворотного зв'язку від ${subject || "Анонім"} (${sender_email || "без email"})`,
      html: `Форма зворотнього зв'язку:<br><br>${html}<br><br>Відправник: ${sender_email || "Невідомий"}`,
      replyTo: sender_email || undefined,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email", details: error },
      { status: 500 }
    );
  }
}
