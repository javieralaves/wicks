import { NextResponse } from "next/server";
import { appendWaitlistEmail, isValidEmail } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido. Envía { \"email\": \"...\" }." },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    typeof (body as { email: unknown }).email !== "string"
  ) {
    return NextResponse.json(
      { error: "Falta el campo email." },
      { status: 400 },
    );
  }

  const email = (body as { email: string }).email.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email no válido." }, { status: 400 });
  }

  try {
    const storedAt = await appendWaitlistEmail(email);
    return NextResponse.json({ ok: true, storedAt });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    console.error("waitlist write failed:", detail);
    return NextResponse.json(
      {
        error:
          "No se pudo guardar el email en disco. Revisa WAITLIST_PATH o el sistema de archivos.",
      },
      { status: 500 },
    );
  }
}
