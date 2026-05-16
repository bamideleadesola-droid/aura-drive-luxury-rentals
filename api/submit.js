function createReference(type) {
  const prefix = type === "contact" ? "AD-CON" : "AD-BK";
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${prefix}-${time}-${random}`;
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body || "{}");
  }

  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function normalizeFields(fields) {
  return Object.fromEntries(
    Object.entries(fields ?? {}).map(([key, value]) => [key, typeof value === "string" ? value.trim() : String(value ?? "").trim()]),
  );
}

function validateSubmission(type, fields) {
  const requiredFields = type === "contact" ? ["Name", "Contact", "Message"] : ["Name", "Contact", "Pickup location"];
  const missingFields = requiredFields.filter((field) => !fields[field]);

  if (missingFields.length > 0) {
    return `Missing required field${missingFields.length === 1 ? "" : "s"}: ${missingFields.join(", ")}`;
  }

  return "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getLeadRecipients() {
  const rawRecipients = process.env.AURA_DRIVE_LEADS_TO_EMAIL || process.env.FORM_TO_EMAIL || process.env.BOOKING_TO_EMAIL || "";

  return rawRecipients
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || process.env.AURA_DRIVE_EMAIL_FROM || "AURA DRIVE <onboarding@resend.dev>";
}

function getReplyToAddress(fields) {
  const contact = fields.Contact || fields.Email || "";
  const emailMatch = contact.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

  return emailMatch?.[0] || "";
}

function formatSubmissionType(type) {
  if (type === "availability") {
    return "availability request";
  }

  return type === "contact" ? "contact message" : "booking request";
}

function formatFieldsList(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function formatFieldsTable(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:12px 0;color:#777;font-size:13px;border-bottom:1px solid #ececea;width:38%;">${escapeHtml(key)}</td>
          <td style="padding:12px 0;color:#111;font-size:14px;font-weight:700;border-bottom:1px solid #ececea;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");
}

function buildLeadEmail(submission) {
  const typeLabel = formatSubmissionType(submission.type);
  const vehicle = submission.fields["Vehicle preference"] ? ` - ${submission.fields["Vehicle preference"]}` : "";

  return {
    subject: `New AURA DRIVE ${typeLabel}: ${submission.reference}${vehicle}`,
    text: [
      `New AURA DRIVE ${typeLabel}`,
      `Reference: ${submission.reference}`,
      `Received: ${submission.receivedAt}`,
      `Path: ${submission.path || "N/A"}`,
      "",
      formatFieldsList(submission.fields),
    ].join("\n"),
    html: `
      <div style="margin:0;padding:32px;background:#f7f7f4;font-family:Inter,Arial,sans-serif;color:#111;">
        <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e7e7e2;border-radius:8px;padding:32px;">
          <p style="margin:0 0 18px;color:#777;font-size:12px;font-weight:800;letter-spacing:.28em;">AURA DRIVE</p>
          <h1 style="margin:0;color:#080808;font-size:34px;line-height:1.05;font-weight:600;">New ${escapeHtml(typeLabel)}</h1>
          <p style="margin:14px 0 0;color:#666;font-size:15px;line-height:1.55;">Reference <strong>${escapeHtml(
            submission.reference,
          )}</strong> was received from ${escapeHtml(submission.path || "the website")}.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:26px;">
            ${formatFieldsTable(submission.fields)}
          </table>
          <p style="margin:24px 0 0;color:#777;font-size:13px;line-height:1.5;">Received at ${escapeHtml(submission.receivedAt)}.</p>
        </div>
      </div>
    `,
  };
}

function buildCustomerEmail(submission) {
  const typeLabel = formatSubmissionType(submission.type);

  return {
    subject: `AURA DRIVE received your ${typeLabel}`,
    text: [
      "AURA DRIVE",
      `We received your ${typeLabel}.`,
      `Reference: ${submission.reference}`,
      "",
      "Concierge will review availability, timing, and handover details, then reply with the next step.",
      "",
      "Your request:",
      formatFieldsList(submission.fields),
    ].join("\n"),
    html: `
      <div style="margin:0;padding:32px;background:#f7f7f4;font-family:Inter,Arial,sans-serif;color:#111;">
        <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e7e7e2;border-radius:8px;padding:32px;">
          <p style="margin:0 0 18px;color:#777;font-size:12px;font-weight:800;letter-spacing:.28em;">AURA DRIVE</p>
          <h1 style="margin:0;color:#080808;font-size:34px;line-height:1.05;font-weight:600;">Request received.</h1>
          <p style="margin:14px 0 0;color:#666;font-size:15px;line-height:1.6;">Concierge will review your ${escapeHtml(
            typeLabel,
          )}, confirm the right next step, and reply as soon as possible.</p>
          <div style="margin-top:26px;padding:18px 20px;background:#f7f7f4;border:1px solid #ececea;border-radius:8px;">
            <p style="margin:0 0 6px;color:#777;font-size:12px;font-weight:800;letter-spacing:.12em;">REFERENCE</p>
            <p style="margin:0;color:#080808;font-size:22px;font-weight:700;">${escapeHtml(submission.reference)}</p>
          </div>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:26px;">
            ${formatFieldsTable(submission.fields)}
          </table>
          <p style="margin:24px 0 0;color:#777;font-size:13px;line-height:1.5;">Thank you for choosing AURA DRIVE.</p>
        </div>
      </div>
    `,
  };
}

async function sendResendEmail({ to, subject, html, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, skipped: true, reason: "missing RESEND_API_KEY" };
  }

  if (!to || (Array.isArray(to) && to.length === 0)) {
    return { sent: false, skipped: true, reason: "missing recipient" };
  }

  const payload = {
    from: getFromAddress(),
    to,
    subject,
    html,
    text,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const resendPayload = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    throw new Error(resendPayload.message || resendPayload.error || "Resend email failed");
  }

  return { sent: true, id: resendPayload.id };
}

async function sendEmailNotifications(submission) {
  const leadRecipients = getLeadRecipients();
  const replyTo = getReplyToAddress(submission.fields);
  const leadEmail = buildLeadEmail(submission);
  const leadStatus = await sendResendEmail({
    to: leadRecipients,
    subject: leadEmail.subject,
    html: leadEmail.html,
    text: leadEmail.text,
    replyTo,
  });
  let customerStatus = { sent: false, skipped: true, reason: "no customer email" };

  if (replyTo) {
    const customerEmail = buildCustomerEmail(submission);

    try {
      customerStatus = await sendResendEmail({
        to: replyTo,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
      });
    } catch (error) {
      console.error("AURA DRIVE customer email error", error);
      customerStatus = { sent: false, error: "customer email failed" };
    }
  }

  return {
    lead: leadStatus,
    customer: customerStatus,
  };
}

async function forwardSubmission(submission) {
  if (!process.env.FORM_WEBHOOK_URL) {
    return;
  }

  await fetch(process.env.FORM_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const type = ["booking", "availability", "contact"].includes(body.formType) ? body.formType : "booking";
    const fields = normalizeFields(body.fields);
    const validationError = validateSubmission(type, fields);

    if (validationError) {
      response.status(400).json({ ok: false, message: validationError });
      return;
    }

    const submission = {
      reference: createReference(type),
      type,
      fields,
      path: typeof body.path === "string" ? body.path : "",
      receivedAt: new Date().toISOString(),
    };

    await forwardSubmission(submission);
    const email = await sendEmailNotifications(submission);
    console.info("AURA DRIVE submission", JSON.stringify(submission));

    response.status(200).json({
      ok: true,
      reference: submission.reference,
      type: submission.type,
      receivedAt: submission.receivedAt,
      email,
    });
  } catch (error) {
    console.error("AURA DRIVE submission error", error);
    response.status(500).json({ ok: false, message: "Unable to process submission" });
  }
}
