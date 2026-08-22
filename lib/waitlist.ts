import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

/**
 * Local: data/waitlist.jsonl (repo-relative, durable on disk).
 * Vercel serverless: /tmp/casilla-waitlist.jsonl (writable, but ephemeral —
 * cleared when the instance recycles). Override with WAITLIST_PATH.
 */
export function getWaitlistPath(): string {
  if (process.env.WAITLIST_PATH) {
    return process.env.WAITLIST_PATH;
  }

  if (process.env.VERCEL) {
    return "/tmp/casilla-waitlist.jsonl";
  }

  return path.join(process.cwd(), "data", "waitlist.jsonl");
}

export async function appendWaitlistEmail(email: string): Promise<string> {
  const filePath = getWaitlistPath();
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });

  const line = `${JSON.stringify({
    email,
    at: new Date().toISOString(),
  })}\n`;

  await appendFile(filePath, line, "utf8");
  return filePath;
}
