import type { Metadata } from 'next';
import './globals.css';
import LayoutWithNav from './layoutWithNav';
import { AuthProviders, ReactQueryProvider } from './providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from '@/lib/utils/googleAnalytics';

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
      <AuthProviders>
        <body
          suppressHydrationWarning
          className="relative bg-primary-light w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center custom601:pt-28 custom601:pb-20"
        >
          <div className="absolute z-[100] w-[500px] h-full top-4 pc-mockup-bg" />
          <div className="w-full h-full flex justify-center items-cente custom601:w-[430px]">
            <div
              className="w-full h-full bg-white custom601:rounded-[2rem] custom601:pt-10"
              style={{
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <LayoutWithNav>
                <ReactQueryProvider>
                  <GoogleAnalytics />
                  {children} <ReactQueryDevtools initialIsOpen={false} />
                </ReactQueryProvider>
              </LayoutWithNav>
            </div>
          </div>
        </body>
      </AuthProviders>
    </html>
  );
}
