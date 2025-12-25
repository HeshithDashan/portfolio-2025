import type { Metadata } from "next";
// 👇 1. JetBrains_Mono අලුතින් import කළා
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import { GodModeProvider } from "@/components/GodModeContext";
import MatrixRain from "@/components/MatrixRain"; 

// 👇 2. Normal Font එක (Inter) Variable එකක් විදියට හැදුවා
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", 
});

// 👇 3. Hacker Font එක (JetBrains Mono) Variable එකක් විදියට හැදුවා
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
      {/* 👇 4. body එකට ෆොන්ට් දෙකම load කරා + Smooth Transition දැම්මා */}
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased transition-colors duration-500`}>
        <GodModeProvider>
          <MatrixRain /> 
          {children}
        </GodModeProvider>
      </body>
    </html>
  );
}