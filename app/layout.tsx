import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import { GodModeProvider } from "@/components/GodModeContext";
import MatrixRain from "@/components/MatrixRain"; 

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono", 
});

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

      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased transition-colors duration-500`}>
        <GodModeProvider>
          <MatrixRain /> 
          {children}
        </GodModeProvider>
      </body>
    </html>
  );
}