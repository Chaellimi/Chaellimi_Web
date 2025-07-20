'use client';

import BottomButton from '@/components/shared/BottomButton';
import { useRouter } from 'next/navigation';
import React from 'react';

const Community = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10">
      <div className="text-h3">서비스 준비중입니다.</div>
      <div className="w-full px-16">
        <BottomButton
          title="홈으로 이동하기"
          onClick={() => {
            router.push('/');
          }}
          disabled="false"
        />
      </div>
    </div>
  );
};

export default Community;
