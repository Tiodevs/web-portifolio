import type { Metadata } from "next";

import { Menu } from "../components/Menu/Menu";
import CustomCursor from "../components/CustomCursor/CustomCursor";
import { LoadingOverlay } from "../components/LoadingOverlay/LoadingOverlay";
import "./globals.css";
import { SITE_URL } from "../lib/social";

import { Manrope, Inter, Sora } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope'
});
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});
const sora = Sora({
  subsets: ["latin"],
  variable: '--font-sora'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Felipe P. dos Santos — Desenvolvedor Full Stack Pleno",
  description: "Desenvolvedor Full Stack Pleno em Curitiba: web, cloud, IA e automação. React, Next.js, Node, AWS e entrega de produto com impacto mensurável.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Felipe P. dos Santos — Desenvolvedor Full Stack Pleno",
    description: "Desenvolvedor Full Stack Pleno em Curitiba: web, cloud, IA e automação. React, Next.js, Node, AWS e entrega de produto com impacto mensurável.",
    images: [
      {
        url: '/capaLink.png',
        width: 1200,
        height: 630,
        alt: 'Felipe P. dos Santos — Desenvolvedor Full Stack Pleno',
      },
    ],
    url: `${SITE_URL}/home`,
    type: 'website',
    siteName: "Felipe P. dos Santos — Portfólio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${manrope.variable} ${inter.variable} ${sora.variable}`}>
        <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
        <LoadingOverlay />
        <CustomCursor/>
        <Menu />
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
