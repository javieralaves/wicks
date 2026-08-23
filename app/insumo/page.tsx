import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";

export const metadata: Metadata = {
  title: "Insumo",
  description:
    "A directory of report types. See exactly which context you must feed, then generate the report.",
};

const steps = [
  {
    n: "01",
    title: "Pick a report",
    body: "Choose a named output — weekly training load, Notion review, sleep × calendar.",
  },
  {
    n: "02",
    title: "See required context",
    body: "Insumo lists the exact inputs. No guessing what belongs in the prompt.",
  },
  {
    n: "03",
    title: "Feed it",
    body: "Pull from the apps you already use. Paste, export, or link the pieces it asks for.",
  },
  {
    n: "04",
    title: "Get the report",
    body: "A finished report with a name — not another blank planner to fill.",
  },
] as const;

const reports = [
  {
    name: "Weekly training load",
    outcome: "Volume, strain, and recovery signal for the week.",
    inputs: ["Workout log", "Session RPE / notes", "Planned volume"],
  },
  {
    name: "Notion weekly review",
    outcome: "What moved, what stalled, what to carry forward.",
    inputs: ["Open tasks", "Closed tasks", "Calendar blocks", "Goals page"],
  },
  {
    name: "Sleep × calendar",
    outcome: "How sleep lined up with the days that demanded focus.",
    inputs: ["Sleep duration / stages", "Next-day calendar density", "Wake times"],
  },
] as const;

export default function InsumoPage() {
  return (
    <main className="min-h-full bg-[linear-gradient(165deg,#e8eef4_0%,#ebf0f4_40%,#dfe7ef_100%)]">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-6 pt-14 pb-16 sm:px-10 sm:pt-20 sm:pb-24">
          <Link
            href="/"
            className="mb-10 inline-block text-sm text-muted transition-colors hover:text-ink"
          >
            ← Wicks
          </Link>

          <p className="animate-rise text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Insumo
          </p>

          <h1 className="animate-rise-delay mt-6 max-w-xl text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
            A directory of report types. See the inputs. Generate the report.
          </h1>

          <p className="animate-rise-late mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            For founders who already live in Notion, health, and fitness apps —
            and want a named report, not another planner.
          </p>

          <div className="animate-rise-late mt-10 max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-3xl gap-8 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            Problem
          </h2>
          <div className="max-w-prose">
            <p className="text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
              You have the apps. You do not have the report.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              The data is already in Notion, Whoop, Strong, your calendar. What
              nobody lists is which context each report needs — so you stall, or
              you invent another system instead of shipping the output.
            </p>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="border-b border-line bg-surface/50">
        <div className="mx-auto grid w-full max-w-3xl gap-8 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            Who it is for
          </h2>
          <div className="max-w-prose">
            <p className="text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
              Founders who already track — and want a named report.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              You live in health, fitness, and productivity tools. You do not
              need another blank weekly planner. You need a specific report with
              a name, and a clear list of what to feed it.
            </p>
          </div>
        </div>
      </section>

      {/* How */}
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            How it works
          </h2>
          <p className="mt-4 max-w-xl text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
            Pick → see inputs → feed → report.
          </p>

          <ol className="mt-12 flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step.n}
                className={`grid gap-3 border-t border-line py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 ${
                  index === steps.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-semibold tabular-nums text-muted">
                  {step.n}
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-ink">
                    {step.title}
                  </p>
                  <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof / examples */}
      <section className="border-b border-line bg-surface/50">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            Example reports
          </h2>
          <p className="mt-4 max-w-xl text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
            Each report names the context you must feed.
          </p>

          <ul className="mt-12 flex flex-col gap-6">
            {reports.map((report, index) => (
              <li
                key={report.name}
                className={`animate-rise border border-line bg-paper/80 px-5 py-6 sm:px-7 sm:py-7 ${
                  index === 1 ? "animate-rise-delay" : ""
                } ${index === 2 ? "animate-rise-late" : ""}`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {report.name}
                  </h3>
                  <p className="text-sm text-muted sm:text-right">
                    {report.outcome}
                  </p>
                </div>

                <div className="animate-rule mt-5 h-px bg-line" />

                <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  Required inputs
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {report.inputs.map((input) => (
                    <li
                      key={input}
                      className="flex items-start gap-3 text-base text-ink"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink"
                      />
                      {input}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist">
        <div className="mx-auto grid w-full max-w-3xl gap-8 px-6 py-16 sm:px-10 sm:py-24 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            Waitlist
          </h2>
          <div>
            <p className="max-w-prose text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
              Get email when Insumo opens.
            </p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
              No Stripe checkout, no fake generator. Just a place on the list
              when the directory is ready to try.
            </p>
            <div className="mt-8 max-w-md">
              <WaitlistForm id="insumo-waitlist-email-footer" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8 text-sm text-muted sm:px-10">
          <span>Insumo</span>
          <Link href="/" className="transition-colors hover:text-ink">
            All days →
          </Link>
        </div>
      </footer>
    </main>
  );
}
