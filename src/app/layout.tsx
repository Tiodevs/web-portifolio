import type { Metadata, Viewport } from "next";


import { Menu } from "../components/Menu/Menu";
import CustomCursor from "../components/CustomCursor/CustomCursor";
import { LoadingOverlay } from "../components/LoadingOverlay/LoadingOverlay";
import "./globals.css";

import { Manrope, Inter, Sora } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Felipe Santos - Portfólio",
  description: "Portfólio de Felipe Santos, desenvolvedor Full Stack especializado em React, Node.js e desenvolvimento web moderno.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Felipe Santos - Portfólio",
    description: "Portfólio de Felipe Santos, desenvolvedor Full Stack especializado em React, Node.js e desenvolvimento web moderno.",
    images: [
      {
        url: '/capaLink.png',
        width: 1200,
        height: 630,
        alt: 'Portfólio de Felipe Santos - Desenvolvedor Full Stack',
      },
    ],
    url: "https://webcvfelipe.vercel.app/home",
    type: 'website',
    siteName: "Felipe Santos - Portfólio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${manrope.className} ${inter.className} ${sora.className}`}>
        <LoadingOverlay />
        <CustomCursor/>
        <Menu />
        {children}
      </body>
    </html>
  );
}
