'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/shared/Loading';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: myInfo, status } = useSession();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!myInfo) {
      router.replace('/login');
    }
  }, [myInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
