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

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserRole();

  console.log(user?.data?.UserData?.role);

  useEffect(() => {
    if (user?.data?.UserData?.role === 'user') {
      router.replace('/');
    } else if (isUserError) {
      router.replace('/login');
    }
  }, [myInfo, router, isLoading, user, isUserError]);

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  return <div>{children}</div>;
}
