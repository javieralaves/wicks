"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "No se pudo guardar el email.");
        return;
      }

      setStatus("ok");
      setMessage("Apuntado. Te avisamos cuando haya acceso.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Error de red. Inténtalo de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="waitlist-email" className="text-sm font-medium text-ink">
        Lista de espera
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          disabled={status === "loading"}
          className="min-h-12 flex-1 border border-line bg-surface px-4 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-ink focus:shadow-[0_0_0_3px_rgba(18,26,36,0.12)] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-12 bg-ink px-5 text-base font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Guardando…" : "Apuntarme"}
        </button>
      </div>
      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "ok" ? "text-ok" : "text-flag"}`}
        >
          {message}
        </p>
      ) : (
        <p className="text-sm text-muted">Un email. Sin newsletter genérica.</p>
      )}
    </form>
  );
}
