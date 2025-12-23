import type { Metadata } from "next";
import "./globals.css";
import { DevModeProvider } from "../components/DevModeContext"; 
import CustomCursor from "../components/CustomCursor"; 

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

      <body className="cursor-none"> 
        <DevModeProvider>

          <CustomCursor />
          
          {children}
        </DevModeProvider>
      </body>
    </html>
  );
}