"use client";

import { useMemo, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "ok" | "error";

type Option = { label: string; value: number };

type Question = {
  id: string;
  analyte: string;
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    analyte: "USE-FREQ",
    prompt: "In a typical work week, how often do you use an AI tool for real tasks?",
    options: [
      { label: "Never", value: 0 },
      { label: "A few times", value: 1 },
      { label: "Most days", value: 2 },
      { label: "Daily, on purpose", value: 3 },
      { label: "Daily — built into how I work", value: 4 },
    ],
  },
  {
    id: "q2",
    analyte: "SHIPPED",
    prompt:
      "Have you shipped anything that used AI (workflow, prompt pack, agent, automation)?",
    options: [
      { label: "No", value: 0 },
      { label: "Tried once", value: 1 },
      { label: "Personal experiments only", value: 2 },
      { label: "Used at work", value: 3 },
      { label: "Others rely on what I built", value: 4 },
    ],
  },
  {
    id: "q3",
    analyte: "INTERVIEW",
    prompt:
      "Could you walk an interviewer through what you use AI for — with specifics?",
    options: [
      { label: "I'd go blank", value: 0 },
      { label: "Only vague talk", value: 1 },
      { label: "One clear example", value: 2 },
      { label: "Several concrete examples", value: 3 },
      { label: "A short portfolio of examples", value: 4 },
    ],
  },
  {
    id: "q4",
    analyte: "PEER-GAP",
    prompt:
      "Relative to people already in the role you want, where do you sit on AI fluency?",
    options: [
      { label: "Far behind", value: 0 },
      { label: "Behind", value: 1 },
      { label: "Unsure", value: 2 },
      { label: "Roughly even", value: 3 },
      { label: "Ahead", value: 4 },
    ],
  },
  {
    id: "q5",
    analyte: "PRACTICE",
    prompt: "When did you last deliberately practice an AI-related skill?",
    options: [
      { label: "Over a year / never", value: 0 },
      { label: "Months ago", value: 1 },
      { label: "This month", value: 2 },
      { label: "This week", value: 3 },
      { label: "Today or yesterday", value: 4 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 4;
/** Peer mid-transition reference window on the 0–20 index. */
const REF_LOW = 11;
const REF_HIGH = 15;

export type BandId = "late" | "borderline" | "on-range" | "early";

export function scoreToBand(score: number): {
  id: BandId;
  label: string;
  flag: "H" | "L" | null;
  finding: string;
  note: string;
} {
  if (score <= 5) {
    return {
      id: "late",
      label: "LATE",
      flag: "L",
      finding: "Below reference range",
      note: "You are changing jobs and the AI gap is material. Catch-up is the priority before interviews.",
    };
  }
  if (score <= 10) {
    return {
      id: "borderline",
      label: "BORDERLINE LATE",
      flag: "L",
      finding: "Low end of the curve",
      note: "You are not blank, but you are still behind the peer window for mid-transition job-changers.",
    };
  }
  if (score <= 15) {
    return {
      id: "on-range",
      label: "ON RANGE",
      flag: null,
      finding: "Within reference range",
      note: "You sit with peers mid-transition. Keep practicing so the next role does not pull you late.",
    };
  }
  return {
    id: "early",
    label: "EARLY",
    flag: "H",
    finding: "Above reference range",
    note: "You are ahead of the catch-up curve. Document examples so interviews show the lead, not just the tools.",
  };
}

export function Diagnostic() {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>(
    {},
  );
  const [step, setStep] = useState<"questions" | "email" | "result">(
    "questions",
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [unlocked, setUnlocked] = useState<{
    score: number;
    band: ReturnType<typeof scoreToBand>;
  } | null>(null);

  const answeredCount = QUESTIONS.filter(
    (q) => answers[q.id] !== undefined,
  ).length;
  const complete = answeredCount === QUESTIONS.length;

  const pendingScore = useMemo(() => {
    if (!complete) return null;
    return QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  }, [answers, complete]);

  function selectAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function goToEmail() {
    if (!complete || pendingScore == null) return;
    setStep("email");
  }

  async function onUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingScore == null) return;

    setStatus("loading");
    setMessage("");
    const band = scoreToBand(pendingScore);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "how-early",
          score: pendingScore,
          band: band.label,
        }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not save your email.");
        return;
      }

      setUnlocked({ score: pendingScore, band });
      setStatus("ok");
      setStep("result");
      setMessage("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div className="border border-[var(--he-rule)] bg-[var(--he-surface)]/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--he-rule)] px-4 py-3 sm:px-5">
        <div>
          <p className="he-mono text-[10px] tracking-[0.16em] text-[var(--he-muted)] uppercase">
            Assay panel · HE-AI-01
          </p>
          <p className="mt-1 text-lg font-bold tracking-tight">
            Job-changer AI timing index
          </p>
        </div>
        <p className="he-mono text-xs tabular-nums text-[var(--he-muted)]">
          {answeredCount}/{QUESTIONS.length} analytes · max {MAX_SCORE}
        </p>
      </div>

      {step === "questions" ? (
        <div className="px-4 py-5 sm:px-5 sm:py-6">
          <ol className="flex flex-col gap-6">
            {QUESTIONS.map((question, index) => {
              const selected = answers[question.id];
              return (
                <li key={question.id} className="he-fade">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="he-mono text-[10px] tracking-[0.14em] text-[var(--he-muted)] uppercase">
                      {String(index + 1).padStart(2, "0")} · {question.analyte}
                    </p>
                    {selected !== undefined ? (
                      <span className="he-mono text-xs tabular-nums text-[var(--he-ok)]">
                        logged {selected}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-base leading-snug sm:text-lg">
                    {question.prompt}
                  </p>
                  <div
                    role="radiogroup"
                    aria-label={question.prompt}
                    className="mt-3 flex flex-col gap-1.5"
                  >
                    {question.options.map((option) => {
                      const isOn = selected === option.value;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          role="radio"
                          aria-checked={isOn}
                          onClick={() =>
                            selectAnswer(question.id, option.value)
                          }
                          className={`he-mono flex items-center justify-between gap-3 border px-3 py-2.5 text-left text-sm transition-colors ${
                            isOn
                              ? "border-[var(--he-ink)] bg-[var(--he-paper)] text-[var(--he-ink)]"
                              : "border-[var(--he-rule)] bg-transparent text-[var(--he-muted)] hover:border-[var(--he-ink)] hover:text-[var(--he-ink)]"
                          }`}
                        >
                          <span>{option.label}</span>
                          <span className="tabular-nums">{option.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--he-rule)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--he-muted)]">
              Score stays sealed until email. No SMTP tonight — unlock is
              on-page.
            </p>
            <button
              type="button"
              disabled={!complete}
              onClick={goToEmail}
              className="he-mono min-h-11 bg-[var(--he-ink)] px-5 text-sm font-medium tracking-wide text-[var(--he-paper)] uppercase transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Seal & continue
            </button>
          </div>
        </div>
      ) : null}

      {step === "email" && pendingScore != null ? (
        <div className="px-4 py-6 sm:px-5 sm:py-8">
          <p className="he-mono text-[10px] tracking-[0.16em] text-[var(--he-muted)] uppercase">
            Unlock · result pending
          </p>
          <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Email unlocks the lab strip.
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--he-muted)] sm:text-base">
            We store your email with score and band. When the product is real,
            we can email a longer write-up. Tonight the finding opens here after
            you submit.
          </p>

          <form onSubmit={onUnlock} className="mt-6 flex flex-col gap-3">
            <label
              htmlFor="how-early-email"
              className="he-mono text-xs tracking-[0.12em] text-[var(--he-muted)] uppercase"
            >
              Email
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="how-early-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@domain.com"
                disabled={status === "loading"}
                className="he-mono min-h-11 flex-1 border border-[var(--he-rule)] bg-[var(--he-paper)] px-3 text-sm text-[var(--he-ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--he-muted)]/70 focus:border-[var(--he-ink)] focus:shadow-[0_0_0_3px_rgba(163,20,20,0.12)] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="he-mono min-h-11 bg-[var(--he-flag)] px-5 text-sm font-medium tracking-wide text-[var(--he-paper)] uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? "Filing…" : "Unlock result"}
              </button>
            </div>
            {message ? (
              <p role="status" className="text-sm text-[var(--he-flag)]">
                {message}
              </p>
            ) : (
              <p className="text-sm text-[var(--he-muted)]">
                Persists as{" "}
                <span className="he-mono">
                  {"{ email, source: \"how-early\", score, band }"}
                </span>
                .
              </p>
            )}
            <button
              type="button"
              onClick={() => setStep("questions")}
              className="he-mono w-fit text-xs tracking-wide text-[var(--he-muted)] underline-offset-2 hover:text-[var(--he-ink)] hover:underline"
            >
              ← Edit answers
            </button>
          </form>
        </div>
      ) : null}

      {step === "result" && unlocked ? (
        <ResultPanel score={unlocked.score} band={unlocked.band} />
      ) : null}
    </div>
  );
}

function ResultPanel({
  score,
  band,
}: {
  score: number;
  band: ReturnType<typeof scoreToBand>;
}) {
  const pct = Math.round((score / MAX_SCORE) * 100);
  const flagged = band.flag != null;

  return (
    <div className="he-fade px-4 py-6 sm:px-5 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="he-mono text-[10px] tracking-[0.16em] text-[var(--he-muted)] uppercase">
            Final report · HE-AI-01
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {band.finding}
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--he-muted)] sm:text-base">
            {band.note}
          </p>
        </div>
        {flagged ? (
          <span
            className={`he-stamp he-mono border-2 px-3 py-2 text-sm font-semibold tracking-[0.12em] uppercase ${
              band.flag === "L"
                ? "border-[var(--he-flag)] text-[var(--he-flag)]"
                : "border-[var(--he-ok)] text-[var(--he-ok)]"
            }`}
          >
            Flag {band.flag}
          </span>
        ) : (
          <span className="he-stamp he-mono border-2 border-[var(--he-ok)] px-3 py-2 text-sm font-semibold tracking-[0.12em] text-[var(--he-ok)] uppercase">
            In range
          </span>
        )}
      </div>

      <div className="he-scan mt-6 h-px bg-[var(--he-rule)]" />

      <div className="mt-6 overflow-x-auto">
        <table className="he-mono w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--he-rule)] text-[10px] tracking-[0.14em] text-[var(--he-muted)] uppercase">
              <th className="py-2 pr-4 font-medium">Analyte</th>
              <th className="py-2 pr-4 font-medium">Result</th>
              <th className="py-2 pr-4 font-medium">Ref. range</th>
              <th className="py-2 font-medium">Flag</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--he-rule)]">
              <td className="py-3 pr-4">AI timing index</td>
              <td className="py-3 pr-4 tabular-nums font-medium">
                {score} / {MAX_SCORE}
                <span className="ml-2 text-[var(--he-muted)]">({pct}%)</span>
              </td>
              <td className="py-3 pr-4 tabular-nums text-[var(--he-muted)]">
                {REF_LOW}–{REF_HIGH}
              </td>
              <td
                className={`py-3 font-semibold ${
                  flagged ? "text-[var(--he-flag)]" : "text-[var(--he-ok)]"
                }`}
              >
                {band.flag ?? "—"}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Band</td>
              <td className="py-3 pr-4 font-medium">{band.label}</td>
              <td className="py-3 pr-4 text-[var(--he-muted)]">
                peer mid-transition
              </td>
              <td className="py-3 text-[var(--he-muted)]">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <p className="he-mono mb-2 text-[10px] tracking-[0.14em] text-[var(--he-muted)] uppercase">
          Position vs reference
        </p>
        <div className="relative h-3 border border-[var(--he-rule)] bg-[var(--he-paper)]">
          <div
            aria-hidden
            className="absolute inset-y-0 bg-[var(--he-ok)]/25"
            style={{
              left: `${(REF_LOW / MAX_SCORE) * 100}%`,
              width: `${((REF_HIGH - REF_LOW) / MAX_SCORE) * 100}%`,
            }}
          />
          <div
            className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-[var(--he-flag)]"
            style={{ left: `calc(${(score / MAX_SCORE) * 100}% - 1px)` }}
            title={`Score ${score}`}
          />
        </div>
        <div className="he-mono mt-1.5 flex justify-between text-[10px] tabular-nums text-[var(--he-muted)]">
          <span>0 late</span>
          <span>
            ref {REF_LOW}–{REF_HIGH}
          </span>
          <span>{MAX_SCORE} early</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--he-muted)]">
        Email filed with this result. Longer write-up later — when there is a
        real product to send.
      </p>
    </div>
  );
}
