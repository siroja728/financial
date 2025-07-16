import { Resend } from "resend";
import { NextResponse } from "next/server";

import { getSettings } from "@/lib/api-handlers/settings";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const contactInfo = await getSettings({ setting_name: "contact_info" });
  const { email } = contactInfo;
  const { subject, html, sender_email } = await request.json();

  if (!subject || !html) {
    return NextResponse.json(
      { error: "Missing required fields: to, subject, html" },
      { status: 400 }
    );
  }

  try {
    resend.emails.send({
      from: `Financial Courses <onboarding@resend.dev>`,
      to: email,
      subject,
      html: `Email from: ${sender_email}<br><br>${html}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email", details: error },
      { status: 500 }
    );
  }
}
