'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ShapeQuestionIcon } from '@public/icons/Challenge/certification';
import Header from '@/components/shared/Header';
import BottomButton from '@/components/shared/BottomButton';
import Image from 'next/image';

const CertificationDone = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get('image');
  const challengeId = usePathname().split('/').slice(0, 4)[2];

  const [takenTime, setTakenTime] = useState<string | null>(null);

  useEffect(() => {
    const time = sessionStorage.getItem('cert-taken-time');
    if (time) setTakenTime(time);
  }, []);

  console.log(takenTime);

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
        title="인증하기"
        backClick={`/challenge/${challengeId}/certification`}
        icon={<ShapeQuestionIcon color="black" />}
      />

      <div className="flex flex-col items-center justify-center w-full h-full px-4">
        <h1 className="mb-4 text-center text-h3">
          이 사진으로 인증할까요?{' '}
          {/* {takenTime ? (
            <span className="block mt-1 text-gray-500 text-c1">
              촬영 시각: {takenTime}
            </span>
          ) : (
            <span className="block mt-1 text-gray-400 text-c1">
              촬영 시간 정보 없음
            </span>
          )} */}
        </h1>

        <div className="relative h-[327px] w-[327px]">
          <Image
            width={327}
            height={327}
            src={image}
            alt="인증 사진"
            className="object-cover object-top w-full h-full shadow-md rounded-2xl"
          />

          <div className="absolute text-white transform -translate-x-1/2 bottom-5 left-1/2 text-bn1">
            {takenTime ? (
              <span>촬영 시각: {takenTime}</span>
            ) : (
              <span>촬영 시간 정보 없음</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
        <button
          className="h-full text-gray-600 bg-gray-100 min-w-20 rounded-xl"
          onClick={() => {
            router.push(`/challenge/${challengeId}/certification`);
          }}
        >
          취소
        </button>
        <BottomButton title="인증하기" onClick={() => {}} disabled="false" />
      </div>
    </div>
  );
};

export default CertificationDone;
