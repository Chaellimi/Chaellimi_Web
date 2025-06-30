'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShapeQuestionIcon } from '@public/icons/Challenge/certification';
import Header from '@/components/shared/Header';
import BottomButton from '@/components/shared/BottomButton';
import Image from 'next/image';

const CertificationDone = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get('image');
  const challengeId = usePathname().split('/').slice(0, 4)[2];

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-lg text-gray-500">
        이미지 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white">
      <Header
        type="default"
        backClick={`/challenge/${challengeId}/certification`}
        icon={<ShapeQuestionIcon color="black" />}
      />

      <div className="flex flex-col items-center justify-center w-full h-full px-4">
        <h1 className="mb-4 text-gray-800 text-h3">이 사진으로 인증할까요?</h1>
        <Image
          width={327}
          height={327}
          src={image}
          alt="인증 사진"
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
        <div></div>
        <div className="h-7 w-[0.0625rem] bg-gray-200" />
        <BottomButton title="인증하기" onClick={() => {}} disabled="false" />
      </div>
    </div>
  );
};

export default CertificationDone;
