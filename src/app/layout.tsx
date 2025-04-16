import type { Metadata } from 'next';
import './globals.css';
import LayoutWithNav from './layoutWithNav';
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
      <body className="w-[100vw] h-[100vh] overflow-hidden">
        <div className="flex justify-center w-full h-full bg-primary-light">
          <div className="w-[430px] min-h-screen bg-white">
            <LayoutWithNav>{children}</LayoutWithNav>
          </div>
        </div>
      </body>
    </html>
  );
}
