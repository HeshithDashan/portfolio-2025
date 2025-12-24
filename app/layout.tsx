import './globals.css';
import { DevModeProvider } from '../components/DevModeContext';

export const metadata = {
  title: 'Heshith Dashan | Portfolio',
  description: 'Fullstack Software Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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