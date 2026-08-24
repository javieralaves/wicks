import Link from "next/link";

const days = [
  {
    slug: "casilla",
    name: "Casilla",
    blurb: "Antes del Modelo 303, marca facturas que no son IVA 21% nacional.",
  },
  {
    slug: "insumo",
    name: "Insumo",
    blurb:
      "A directory of report types — see the required context, then generate.",
  },
  {
    slug: "how-early",
    name: "How Early",
    blurb:
      "Job-changers catching up on AI — score how early you are vs a reference range.",
  },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-col px-6 py-16 sm:py-24">
      <header className="mb-12">
        <p className="text-sm tracking-[0.08em] text-muted uppercase">Wicks</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Días enviados
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          Un producto por día aprobado. Hoy: Casilla, Insumo y How Early.
        </p>
      </header>

      <ul className="flex flex-col gap-1 border-t border-line">
        {days.map((day) => (
          <li key={day.slug} className="border-b border-line">
            <Link
              href={`/${day.slug}`}
              className="group flex flex-col gap-1 py-5 transition-colors hover:text-ok sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="text-lg font-semibold tracking-tight">
                {day.name}
              </span>
              <span className="text-sm leading-snug text-muted group-hover:text-ink/70">
                {day.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
