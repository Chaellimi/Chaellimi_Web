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
    <AuthProviders>
      <LayoutWithNav>
        <ReactQueryProvider>
          <GoogleAnalytics />
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </LayoutWithNav>
    </AuthProviders>
  );
}
