import GoogleIcon from '@/components/Login/GoogleIcon';
import TextLogo from '@/components/shared/TextLogo';
import Image from 'next/image';
import React from 'react';

const Login = () => {
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
      <div className="relative flex justify-center items-center w-full border border-gray-200 rounded-[0.75rem] text-bn2 pt-[1.31rem] pr-[1.25rem] pb-[1.31rem] pl-[1.25rem]">
        <div className="absolute left-[1.25rem] -translate-y-1/2 top-1/2">
          <GoogleIcon />
        </div>
        구글 계정으로 시작하기
      </div>
    </div>
  );
};

export default Login;
