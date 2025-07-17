'use client';

import { usePathname } from 'next/navigation';
import Navigationbar from '@/components/shared/Navigationbar';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const adminPath = pathname.startsWith('/admin');

  // Nav를 안보여야 하는 조건
  const showNavbar =
    pathname !== '/login' &&
    pathname !== '/splash' &&
    pathname !== '/profile/bookmark' &&
    !(pathname.startsWith('/challenge') && pathname !== '/challenge') &&
    !adminPath &&
    !(pathname.startsWith('/point') && pathname !== '/point');

  // activeNav 설정
  let activeNav: 'home' | 'challenge' | 'community' | 'profile' = 'home';
  if (pathname === '/') activeNav = 'home';
  else if (pathname === '/challenge') activeNav = 'challenge';
  else if (pathname.startsWith('/community')) activeNav = 'community';
  else if (pathname.startsWith('/profile')) activeNav = 'profile';

  return (
    <>
      {showNavbar && <Navigationbar Active={activeNav} />}

      {adminPath ? (
        <html lang="ko">
          <body>{children}</body>
        </html>
      ) : (
        <html lang="ko">
          <body
            suppressHydrationWarning
            className="relative bg-primary-light w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center custom601:pt-14 custom601:pb-6"
          >
            <div className="absolute z-[100] w-[500px] h-full top-4 pc-mockup-bg" />
            <div className="w-full h-full flex justify-center items-cente custom601:w-[430px]">
              <div
                className="w-full h-full bg-white custom601:rounded-[2rem] custom601:pt-10"
                style={{
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                {children}
              </div>
            </div>
          </body>
        </html>
      )}
    </>
  );
}
