'use client';

import Loading from '@/components/shared/Loading';
import TextLogo from '@/components/shared/TextLogo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Splash = () => {
  const router = useRouter();
  const { data: myInfo, status } = useSession();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!myInfo) {
      router.replace('/login');
    } else {
      router.replace('/');
    }
  }, [myInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row items-center justify-center w-full h-full">
      <TextLogo />
    </div>
  );
};

export default Splash;
