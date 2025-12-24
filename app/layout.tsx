import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GodModeProvider } from "@/components/GodModeContext";
import MatrixRain from "@/components/MatrixRain"; // 1. මේක import කරන්න

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
          <MatrixRain /> {/* 2. මේක මෙතනට දාන්න (children වලට උඩින් හෝ යටින්) */}
          {children}
        </GodModeProvider>
      </body>
    </html>
  );
}