'use client';

import BottomButton from '@/components/shared/BottomButton';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import FinishCheckImage from '@public/images/FinishCheckImage.png';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';

const Finish = () => {
  const router = useRouter();

  useStatusBarBridge({
    backgroundColor: '#FFF',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  return (
    <div className="flex flex-col w-full h-full px-6">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div>
          <Image src={FinishCheckImage} width={90} alt="" />
        </div>

        <div className="flex flex-col items-center justify-center gap-[0.31rem]">
          <div className="text-h1 text-gray-black">참여 완료!</div>
          <div className="text-gray-500 text-b3">
            매일 목표를 달성하며 조금씩 성장해보세요.
          </div>
        </div>
      </div>

      <BottomButton
        title="확인"
        onClick={() => {
          router.back();
        }}
        disabled="false"
      />
    </div>
  );
};

export default Finish;
