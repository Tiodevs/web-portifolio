import type { Metadata } from "next";
import { Manrope, Inter, Sora } from "next/font/google";
import "./globals.css";
import { Menu } from "./components/Menu";
import CustomCursor from "./components/CustomCursor";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { ContentWrapper } from "./components/ContentWrapper";
const manrope = Manrope({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Felipe Santos - Desenvolvedor Full Stack",
  description: "Portfólio de Felipe Santos, desenvolvedor Full Stack especializado em React, Node.js e desenvolvimento web moderno.",
  icons: {
    icon: '/favicon.svg',
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
