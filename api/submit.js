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
    console.info("AURA DRIVE submission", JSON.stringify(submission));

    response.status(200).json({
      ok: true,
      reference: submission.reference,
      type: submission.type,
      receivedAt: submission.receivedAt,
    });
  } catch (error) {
    console.error("AURA DRIVE submission error", error);
    response.status(500).json({ ok: false, message: "Unable to process submission" });
  }
}
