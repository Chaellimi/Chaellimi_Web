'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/shared/Loading';
import { useGetUserRole } from '@/service/shared/shared.query';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: myInfo, status } = useSession();
  const isLoading = status === 'loading';

  const user = useGetUserRole();
  console.log(user);

  useEffect(() => {
    if (!isLoading && !myInfo) {
      router.replace('/login');
    }
  }, [myInfo, router, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
