import { NextRequest, NextResponse } from "next/server";
import {
  createTransporter,
  resolveRecipient,
  buildContactEmail,
  buildDemarrerEmail,
  buildUrgenceEmail,
  type ContactPayload,
  type DemarrerPayload,
  type UrgencePayload,
} from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    const isMultipart = contentType.includes("multipart/form-data");

    let body: Record<string, unknown>;
    let attachments: { filename: string; content: Buffer; contentType: string }[] = [];

    if (isMultipart) {
      const fd = await req.formData();
      body = JSON.parse(fd.get("data") as string);

      const files = fd.getAll("files") as File[];
      attachments = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          content: Buffer.from(await f.arrayBuffer()),
          contentType: f.type || "application/octet-stream",
        })),
      );
    } else {
      body = await req.json();
    }

    const { intent } = body as { intent: string };
    if (!intent) {
      return NextResponse.json({ error: "intent manquant" }, { status: 400 });
    }

    let subject: string;
    let html: string;

    if (intent === "contact") {
      ({ subject, html } = buildContactEmail(body as unknown as ContactPayload));
    } else if (intent === "urgent") {
      ({ subject, html } = buildUrgenceEmail(body as unknown as UrgencePayload));
    } else {
      ({ subject, html } = buildDemarrerEmail(body as unknown as DemarrerPayload));
    }

    const to = resolveRecipient(intent);
    const from = `"Equatys Energy" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;

    const transporter = createTransporter();
    await transporter.sendMail({
      from,
      to,
      replyTo: (body as { email?: string }).email,
      subject,
      html,
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
