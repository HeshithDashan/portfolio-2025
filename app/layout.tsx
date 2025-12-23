import type { Metadata } from "next";
import "./globals.css";
import { DevModeProvider } from "../components/DevModeContext"; 
import CustomCursor from "../components/CustomCursor"; // ✅ 1. අලුත් කෑල්ල

export const metadata: Metadata = {
  title: "Heshith Dashan | Portfolio",
  description: "Fullstack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* මවුස් එකේ default කූර (Pointer) එක හැංගුවා -> cursor-none */}
      <body className="cursor-none"> 
        <DevModeProvider>
          {/* ✅ 2. අපේ මැජික් කර්සර් එක මෙතනට දැම්මා */}
          <CustomCursor />
          
          {children}
        </DevModeProvider>
      </body>
    </html>
  );
}