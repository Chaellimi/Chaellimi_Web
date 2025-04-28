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

  // pathname에 따라 Active prop 설정
  let activeNav: 'home' | 'challenge' | 'community' | 'profile' = 'home';
  if (pathname === '/') activeNav = 'home';
  else if (pathname.startsWith('/challenge')) activeNav = 'challenge';
  else if (pathname.startsWith('/community')) activeNav = 'community';
  else if (pathname.startsWith('/profile')) activeNav = 'profile';

  return (
    <>
      {showNavbar && <Navigationbar Active={activeNav} />}
      {children}
    </>
  );
}
