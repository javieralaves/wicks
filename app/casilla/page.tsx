import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";

export const metadata: Metadata = {
  title: "Casilla",
  description:
    "Antes del Modelo 303, marca las facturas al extranjero que no deberían ir al 21% doméstico.",
};

export default function CasillaPage() {
  return (
    <main className="relative min-h-full overflow-hidden bg-[linear-gradient(135deg,#e8eef4_0%,#ebf0f4_45%,#d8e2ec_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 55%, black 100%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-2">
        <section className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:py-20">
          <Link
            href="/"
            className="mb-10 w-fit text-sm text-muted transition-colors hover:text-ink"
          >
            ← Wicks
          </Link>

          <p className="animate-rise text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Casilla
          </p>

          <h1 className="animate-rise-delay mt-6 max-w-md text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
            Antes del Modelo 303, marca las facturas que no son IVA 21%
            nacional.
          </h1>

          <p className="animate-rise-late mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Para autónomos y SL pequeñas que facturan a HK, US o B2B UE — y ya
            pagan Cuéntica o un gestor. Evita pagar de más por un tipo
            equivocado.
          </p>

          <div className="animate-rise-late mt-10 max-w-md">
            <WaitlistForm />
          </div>
        </section>

        <section
          aria-label="Ejemplo de factura marcada"
          className="relative flex min-h-[420px] items-stretch lg:min-h-screen"
        >
          <div className="animate-rise-late flex w-full flex-col justify-center border-t border-line bg-surface/80 px-6 py-10 backdrop-blur-[2px] sm:px-10 lg:border-t-0 lg:border-l lg:py-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.14em] text-muted uppercase">
                  Factura
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight">
                  Acme HK Ltd
                </p>
              </div>
              <p className="text-sm text-muted">Pre-303</p>
            </div>

            <dl className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 text-sm sm:text-base">
              <dt className="text-muted">Concepto</dt>
              <dd className="text-right font-medium">Servicios de diseño</dd>
              <dt className="text-muted">Base imponible</dt>
              <dd className="text-right font-medium tabular-nums">
                1.759,91 €
              </dd>
              <dt className="text-muted">Tipo aplicado</dt>
              <dd className="text-right font-medium text-flag">
                21% doméstico
              </dd>
            </dl>

            <div className="animate-rule mt-8 h-px bg-line" />

            <div className="animate-flag mt-8 bg-flag-soft/80 py-4 pr-4 pl-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-flag uppercase">
                Revisar casilla de IVA
              </p>
              <p className="mt-2 max-w-sm text-sm leading-snug text-ink sm:text-base">
                Parece operación exterior. No debería entrar al Modelo 303 como
                IVA nacional.
              </p>
            </div>

            <p className="mt-8 text-sm text-muted">
              Si se deja así:{" "}
              <span className="font-semibold text-flag tabular-nums">
                369,58 € de IVA de más
              </span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
