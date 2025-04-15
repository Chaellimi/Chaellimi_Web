import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chaellimi',
  description: 'Chaellimi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="w100vw h100vh">
        <div className="flex justify-center w-full h-full bg-primary-light">
          <div className="w-[430px] min-h-screen bg-white">{children}</div>
        </div>
      </body>
    </html>
  );
}
