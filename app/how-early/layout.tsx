import type { Metadata } from "next";
import { IBM_Plex_Mono, Libre_Baskerville } from "next/font/google";
import "./how-early.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-he-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-he-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "How Early",
  description:
    "A short diagnostic for job-changers who need to catch up on AI. Score how early you are vs a reference range — email unlocks the result.",
};

export default function HowEarlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`how-early-root ${libreBaskerville.variable} ${ibmPlexMono.variable} min-h-full`}
    >
      {children}
    </div>
  );
}
