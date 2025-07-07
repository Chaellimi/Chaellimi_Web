'use client';

import GoogleIcon from '@/components/Login/GoogleIcon';
import TextLogo from '@/components/shared/TextLogo';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import KakaoIcon from '@/components/Login/KakaoIcon';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/' }).catch((error) => {
      console.error('Login failed:', error);
      setIsLoading(false);
    });
  };

  const handleKakaoLogin = () => {
    setIsLoading(true);
    signIn('kakao', { callbackUrl: '/' }).catch((error) => {
      console.error('Login failed:', error);
      setIsLoading(false);
    });
  };

  const { data: session, status } = useSession();

  const isLoadingSession = status === 'loading';

  useEffect(() => {
    if (!isLoadingSession && session) {
      router.replace('/');
    }
  }, [isLoadingSession, session, router]);

  if (isLoadingSession || session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-[5.75rem]">
      <div className="flex flex-col gap-[1.12rem]">
        <div className="flex flex-col gap-[0.62rem]">
          <TextLogo width={168} height={44} />
          <span>
            오늘의 결심, 내일의 변화.
            <br />
            챌리미가 당신의 30일을 함께할게요!
          </span>
        </div>
        <Image src={'/images/LoginImage.png'} width={327} height={319} alt="" />
      </div>
      <div className="flex flex-col w-full gap-3">
        <button
          onClick={handleGoogleLogin}
          className="relative flex justify-center items-center w-full border border-gray-200 text-gray-black rounded-[0.75rem] text-bn2 pt-[1.31rem] pr-[1.25rem] pb-[1.31rem] pl-[1.25rem]"
          disabled={isLoading}
        >
          <div className="absolute left-[1.25rem] -translate-y-1/2 top-1/2">
            <GoogleIcon />
          </div>
          {isLoading ? '로그인 중...' : '구글 계정으로 시작하기'}
        </button>

        <button
          onClick={handleKakaoLogin}
          className="relative flex justify-center items-center w-full bg-[#FEE500] text-gray-black rounded-[0.75rem] text-bn2 pt-[1.31rem] pr-[1.25rem] pb-[1.31rem] pl-[1.25rem]"
          disabled={isLoading}
        >
          <div className="absolute left-[1.25rem] -translate-y-1/2 top-1/2">
            <KakaoIcon />
          </div>
          {isLoading ? '로그인 중...' : '카카오로 3초만에 시작하기'}
        </button>
      </div>
    </div>
  );
};

export default Login;
