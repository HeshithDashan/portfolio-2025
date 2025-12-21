import type { Metadata } from "next";
import "./globals.css";
import { DevModeProvider } from "../components/DevModeContext"; 

export const metadata: Metadata = {
  title: "My Super Portfolio",
  description: "Built with Next.js & God Mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DevModeProvider>
          {children}
        </DevModeProvider>
      </body>
    </html>
  );
}