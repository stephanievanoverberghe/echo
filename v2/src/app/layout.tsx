import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import AmbientLayers from "@/components/layout/AmbientLayers";
import "./globals.css";

const inter = Inter({
  variable: "--font-base",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Echo — Journal d’une conscience dans le noir",
  description:
    "Echo — Journal d’une conscience dans le noir, une expérience narrative immersive à explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#contenu-principal">
          Aller au contenu principal
        </a>
        <AmbientLayers />
        <nav
          aria-label="Navigation secondaire"
          className="flex justify-center gap-4 py-4 text-[length:var(--fs-300)] text-[color:var(--color-text-muted)]"
        >
          <Link href="/echo">Echo</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/artefacts">Artefacts</Link>
          <Link href="/carte">Carte</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
