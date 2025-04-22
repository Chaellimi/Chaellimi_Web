import type { Metadata } from 'next';
import './globals.css';
import LayoutWithNav from './layoutWithNav';
import { Providers } from './providers';

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
      <Providers>
        <body className=" bg-primary-light w-[100vw] h-[100vh] max-h-[100vh] max-w-[100vw] overflow-hidden">
          <div className="flex justify-center items-cente min-h-screen sm:h-[820px] sm:pl-[39%] sm:pr-[39%] sm:pt-[8%]">
            <div
              className="w-full min-h-screen max-h-screen md:h-[200px] bg-white sm:rounded-xl sm:pt-10"
              style={{
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <LayoutWithNav>{children}</LayoutWithNav>
            </div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
