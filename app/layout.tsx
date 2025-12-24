import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GodModeProvider } from "@/components/GodModeContext";
import MatrixRain from "@/components/MatrixRain"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hesith Dashan",
  description: "Portfolio 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GodModeProvider>
          <MatrixRain /> 
          {children}
        </GodModeProvider>
      </body>
    </html>
  );
}