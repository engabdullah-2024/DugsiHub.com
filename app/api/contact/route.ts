// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const escapeHtml = (s: string) =>
  s.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function sanitizeFrom(raw?: string) {
  // If empty or a consumer domain, force safe sender
  const fallback = 'Dugsi Hub <onboarding@resend.dev>';
  if (!raw) return fallback;

  const lower = raw.toLowerCase();
  const banned = ["@gmail.com", "@yahoo.", "@outlook.", "@hotmail.", "@aol."];
  if (banned.some(b => lower.includes(b))) return fallback;

  // must include <...@...> or be just email or "Name <email>"
  return raw;
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let data: Record<string, string>;
    if (ct.includes("application/json")) data = await req.json();
    else {
      const fd = await req.formData();
      data = Object.fromEntries(fd.entries()) as Record<string, string>;
    }

    const { name = "", email = "", phone = "", about = "", message = "", bot_field = "" } = data;

    if (bot_field) return NextResponse.json({ ok: true }); // honeypot
    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Server misconfigured: RESEND_API_KEY missing." }, { status: 500 });
    }
    if (!process.env.CONTACT_TO) {
      return NextResponse.json({ ok: false, error: "Server misconfigured: CONTACT_TO missing." }, { status: 500 });
    }

    const from = sanitizeFrom(process.env.CONTACT_FROM);
    const to = process.env.CONTACT_TO!;
    const subject = `New Contact — ${name} ${about ? `(${about})` : ""}`.trim();
    const html = `
      <div style="font-family:Inter,system-ui,Arial,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 8px">New Message from Dugsi Hub Contact Form</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        ${phone ? `<p><b>Phone:</b> ${escapeHtml(phone)}</p>` : ""}
        ${about ? `<p><b>About:</b> ${escapeHtml(about)}</p>` : ""}
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      // keep replies going to the sender
      // @ts-ignore (SDK accepts either)
      reply_to: email,
      replyTo: email,
    });

    if (error) {
      console.error("[CONTACT] Resend error:", error);
      const friendly =
        process.env.NODE_ENV === "development"
          ? `Resend error: ${error.message || String(error)} (from=${from})`
          : "Email send failed.";
      return NextResponse.json({ ok: false, error: friendly }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[CONTACT] Unexpected:", err);
    const friendly =
      process.env.NODE_ENV === "development"
        ? (err?.message || "Unexpected error")
        : "Email send failed.";
    return NextResponse.json({ ok: false, error: friendly }, { status: 500 });
  }
}
