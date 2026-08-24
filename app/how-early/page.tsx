import Link from "next/link";
import { Diagnostic } from "./diagnostic";

const ACCESSION = "HE-2026-0824-003";

const methodSteps = [
  {
    code: "01",
    title: "Answer five analytes",
    body: "Short questions on use, shipping, interview readiness, peer gap, and practice.",
  },
  {
    code: "02",
    title: "We score vs a reference range",
    body: "Client-side index, 0–20. Peer mid-transition window: 11–15.",
  },
  {
    code: "03",
    title: "Email unlocks the strip",
    body: "Result stays sealed until you leave an email. Tonight it opens on this page.",
  },
] as const;

const sampleRows = [
  {
    analyte: "USE-FREQ",
    result: "2",
    range: "2–3",
    flag: "—",
  },
  {
    analyte: "SHIPPED",
    result: "1",
    range: "2–3",
    flag: "L",
  },
  {
    analyte: "INTERVIEW",
    result: "2",
    range: "2–4",
    flag: "—",
  },
  {
    analyte: "PEER-GAP",
    result: "1",
    range: "2–3",
    flag: "L",
  },
  {
    analyte: "PRACTICE",
    result: "2",
    range: "2–4",
    flag: "—",
  },
  {
    analyte: "AI timing index",
    result: "8 / 20",
    range: "11–15",
    flag: "L",
  },
] as const;

export default function HowEarlyPage() {
  return (
    <main className="relative min-h-full overflow-x-hidden">
      {/* Specimen header — full bleed clinical bar */}
      <header className="border-b-2 border-[var(--he-ink)] bg-[var(--he-paper-deep)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="he-fade">
            <Link
              href="/"
              className="he-mono text-[11px] tracking-[0.14em] text-[var(--he-muted)] uppercase transition-colors hover:text-[var(--he-ink)]"
            >
              ← Wicks / days
            </Link>
            <p className="he-mono mt-3 text-[10px] tracking-[0.18em] text-[var(--he-muted)] uppercase">
              Clinical timing assay
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-[var(--he-ink)] sm:text-5xl md:text-6xl">
              How Early
            </h1>
          </div>

          <dl className="he-fade-delay he-mono grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] sm:grid-cols-3">
            <div>
              <dt className="tracking-[0.12em] text-[var(--he-muted)] uppercase">
                Accession
              </dt>
              <dd className="mt-0.5 tabular-nums font-medium">{ACCESSION}</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-[var(--he-muted)] uppercase">
                Specimen
              </dt>
              <dd className="mt-0.5 font-medium">Self-report</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-[var(--he-muted)] uppercase">
                Collected
              </dt>
              <dd className="mt-0.5 tabular-nums font-medium">2026-08-24</dd>
            </div>
          </dl>
        </div>

        {/* Barcode-like strip */}
        <div
          aria-hidden
          className="he-scan flex h-3 w-full items-stretch gap-px overflow-hidden border-t border-[var(--he-ink)]/20 bg-[var(--he-paper)]"
        >
          {Array.from({ length: 64 }, (_, i) => (
            <span
              key={i}
              className="block h-full shrink-0 bg-[var(--he-barcode)]"
              style={{
                width: i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
                opacity: i % 5 === 0 ? 0.35 : 1,
              }}
            />
          ))}
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Problem — FINDING */}
        <section className="he-fade-late he-ruled border border-[var(--he-rule)] bg-[var(--he-paper)]/80 px-5 py-8 sm:px-8 sm:py-10">
          <p className="he-mono text-[10px] tracking-[0.18em] text-[var(--he-flag)] uppercase">
            Finding · 01
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
            You are changing jobs. You do not know if you are behind on AI.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--he-muted)] sm:text-lg">
            The next role assumes fluency you have not measured. Guessing feels
            like preparation. It is not a lab finding.
          </p>
        </section>

        {/* Who — INDICATION */}
        <section className="mt-10 grid gap-6 border-t border-[var(--he-rule)] pt-10 md:grid-cols-[10rem_1fr] md:gap-10">
          <p className="he-mono text-[10px] tracking-[0.18em] text-[var(--he-muted)] uppercase">
            Indication · 02
          </p>
          <div>
            <h2 className="text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              For job-changers who said they need to catch up on AI first.
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-[var(--he-muted)] sm:text-lg">
              Not for people already shipping AI at work. For the transition
              window — when catch-up is the reason you are waiting to apply.
            </p>
          </div>
        </section>

        {/* How — METHOD */}
        <section className="mt-10 border-t border-[var(--he-rule)] pt-10">
          <p className="he-mono text-[10px] tracking-[0.18em] text-[var(--he-muted)] uppercase">
            Method · 03
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
            Answer a few questions. We score how early you are. Email unlocks
            the result.
          </h2>

          <ol className="mt-8 grid gap-0 border border-[var(--he-rule)] sm:grid-cols-3">
            {methodSteps.map((step, index) => (
              <li
                key={step.code}
                className={`bg-[var(--he-surface)]/50 px-5 py-6 ${
                  index > 0 ? "border-t border-[var(--he-rule)] sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <p className="he-mono text-xs tabular-nums text-[var(--he-muted)]">
                  {step.code}
                </p>
                <p className="mt-3 text-lg font-bold tracking-tight">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--he-muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Proof — REFERENCE / sample strip */}
        <section className="mt-10 border-t border-[var(--he-rule)] pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="he-mono text-[10px] tracking-[0.18em] text-[var(--he-muted)] uppercase">
                Reference · 04
              </p>
              <h2 className="mt-3 text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
                Sample lab strip — not a testimonial.
              </h2>
            </div>
            <span className="he-stamp he-mono border border-[var(--he-flag)] bg-[var(--he-flag-soft)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-[var(--he-flag)] uppercase">
              Example · flag L
            </span>
          </div>

          <p className="mt-4 max-w-prose text-base leading-relaxed text-[var(--he-muted)]">
            Peer mid-transition reference for the composite index:{" "}
            <span className="he-mono text-[var(--he-ink)]">11–15 / 20</span>.
            Below that window reads late. Above reads early.
          </p>

          <div className="mt-8 overflow-x-auto border border-[var(--he-rule)] bg-[var(--he-paper)]">
            <div className="he-mono flex flex-wrap items-center justify-between gap-2 border-b border-[var(--he-rule)] bg-[var(--he-paper-deep)] px-4 py-2 text-[10px] tracking-[0.12em] text-[var(--he-muted)] uppercase">
              <span>Specimen HE-DEMO-001 · anonymized</span>
              <span className="tabular-nums">Printed for illustration</span>
            </div>
            <table className="he-mono w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--he-rule)] text-[10px] tracking-[0.14em] text-[var(--he-muted)] uppercase">
                  <th className="px-4 py-2.5 font-medium">Analyte</th>
                  <th className="px-4 py-2.5 font-medium">Result</th>
                  <th className="px-4 py-2.5 font-medium">Ref. range</th>
                  <th className="px-4 py-2.5 font-medium">Flag</th>
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((row) => (
                  <tr
                    key={row.analyte}
                    className={`border-b border-[var(--he-rule)] last:border-b-0 ${
                      row.flag === "L"
                        ? "bg-[var(--he-flag-soft)]/40"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2.5">{row.analyte}</td>
                    <td className="px-4 py-2.5 tabular-nums font-medium">
                      {row.result}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-[var(--he-muted)]">
                      {row.range}
                    </td>
                    <td
                      className={`px-4 py-2.5 font-semibold ${
                        row.flag === "L"
                          ? "text-[var(--he-flag)]"
                          : "text-[var(--he-muted)]"
                      }`}
                    >
                      {row.flag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA — ASSAY */}
        <section id="assay" className="mt-10 border-t-2 border-[var(--he-ink)] pt-10">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="he-blink he-mono inline-block h-2 w-2 rounded-full bg-[var(--he-flag)]" />
            <p className="he-mono text-[10px] tracking-[0.18em] text-[var(--he-muted)] uppercase">
              Assay · 05 · take the diagnostic
            </p>
          </div>
          <h2 className="max-w-2xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
            Run your panel. Email to unlock the strip.
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--he-muted)]">
            Five questions. One score. Result stays hidden until you file an
            email — then it opens here.
          </p>

          <div className="mt-8">
            <Diagnostic />
          </div>
        </section>
      </div>

      <footer className="border-t border-[var(--he-rule)]">
        <div className="he-mono mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-[11px] tracking-[0.08em] text-[var(--he-muted)] uppercase sm:px-8">
          <span>How Early · HE-AI-01</span>
          <Link
            href="/"
            className="transition-colors hover:text-[var(--he-ink)]"
          >
            All days →
          </Link>
        </div>
      </footer>
    </main>
  );
}
