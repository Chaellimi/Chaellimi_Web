'use client';

import { usePathname } from 'next/navigation';
import Navigationbar from '@/components/shared/Navigationbar';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Nav를 안보여야 하는 조건
  const showNavbar =
    pathname !== '/login' &&
    pathname !== '/point' &&
    pathname !== '/splash' &&
    !(pathname.startsWith('/challenge') && pathname !== '/challenge');

  // activeNav 설정
  let activeNav: 'home' | 'challenge' | 'community' | 'profile' = 'home';
  if (pathname === '/') activeNav = 'home';
  else if (pathname === '/challenge') activeNav = 'challenge';
  else if (pathname.startsWith('/community')) activeNav = 'community';
  else if (pathname.startsWith('/profile')) activeNav = 'profile';

  return (
    <>
      {showNavbar && <Navigationbar Active={activeNav} />}
      {children}
    </>
  );
}
