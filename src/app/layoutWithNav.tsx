'use client';

import { usePathname } from 'next/navigation';
import Navigationbar from '@/components/shared/Navigationbar';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = !['/login', '/splash'].includes(pathname);

  return (
    <>
      {showNavbar && <Navigationbar Active="home" />}
      {children}
    </>
  );
}
