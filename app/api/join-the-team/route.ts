import { NextResponse } from "next/server";

// Vercel caps serverless request bodies at ~4.5 MB, so keep resumes under that.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.JOIN_TEAM_TO_EMAIL;
  const from = process.env.JOIN_TEAM_FROM_EMAIL ?? "Alva Pilates <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Join the team: RESEND_API_KEY or JOIN_TEAM_TO_EMAIL is not set");
    return NextResponse.json(
      { error: "Applications are temporarily unavailable. Please email us instead." },
      { status: 500 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot — real visitors never see or fill this field.
  if (field(form, "company")) {
    return NextResponse.json({ ok: true });
  }

  const firstName = field(form, "firstName");
  const lastName = field(form, "lastName");
  const email = field(form, "email");
  const phone = field(form, "phone");
  const resume = form.get("resume");
  const certifications = field(form, "certifications");

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: "Resume must be 4 MB or smaller." }, { status: 400 });
  }
  const lowerName = resume.name.toLowerCase();
  if (!ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
    return NextResponse.json(
      { error: "Resume must be a PDF or Word document." },
      { status: 400 },
    );
  }

  const resumeBase64 = Buffer.from(await resume.arrayBuffer()).toString("base64");
  const fullName = `${firstName} ${lastName}`;

  const rows = [
    ["First name", firstName],
    ["Last name", lastName],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Resume", resume.name],
    ["Certifications", certifications || "None"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value).replace(/\n/g, "<br>")}</strong></td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#1f1f1f">
      <h2 style="margin:0 0 16px">New team application</h2>
      <table style="border-collapse:collapse">${rows}</table>
      <p style="margin-top:20px;color:#6b6b6b">The resume is attached. Reply to this email to respond to ${escapeHtml(firstName)} directly.</p>
    </div>`;

  const text = [
    "New team application",
    "",
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Resume: ${resume.name} (attached)`,
    `Certifications: ${certifications || "None"}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      reply_to: email,
      subject: `Team application — ${fullName}`,
      html,
      text,
      attachments: [{ filename: resume.name, content: resumeBase64 }],
    }),
  });

  if (!response.ok) {
    console.error("Join the team: Resend error", response.status, await response.text());
    return NextResponse.json(
      { error: "We couldn't send your application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
