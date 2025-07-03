'use client';

import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import { formatExifDate } from '@/lib/utils/formatExifDate';
import {
  FailureCertificationIcon,
  ShapeQuestionIcon,
} from '@public/icons/Challenge/certification';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CertificationFailure = () => {
  const path = usePathname();
  const challengeId = path.split('/').slice(0, 4)[2];

  const [takenTime, setTakenTime] = useState<string | null>(null);

  useEffect(() => {
    const time = sessionStorage.getItem('cert-taken-time');
    if (time) setTakenTime(time);
  }, []);

  useStatusBarBridge({
    backgroundColor: '#EBF5FF',
    translucent: true,
    bottomBackgroundColor: '#EBF5FF',
  });

  return (
    <div className="flex flex-col items-center justify-between w-full h-full overflow-y-auto bg-red-100">
      <Header
        type="default"
        title="인증하기"
        backClick={`/challenge/${challengeId}/certification`}
        icon={<ShapeQuestionIcon color="black" />}
      />

      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="relative flex flex-col justify-center gap-8 px-6">
          <div className="flex flex-col items-center justify-center gap-1">
            <div>
              <FailureCertificationIcon />
            </div>
            <div className="text-h3">인증 조건을 만족하지 않아요</div>
            <div className="text-gray-600 text-b1">
              다른 사진으로 다시 시도해주세요.
            </div>
          </div>

          <div className="flex items-center justify-center p-5 bg-white rounded-2xl shadow-[0px_6px_6px_0px_rgba(92,92,92,0.12)]">
            <div className="relative h-[300px] w-[300px]">
              <Image
                width={300}
                height={300}
                src={
                  'https://img.freepik.com/free-photo/man-jump-through-gap-hill-man-jumping-cliff-blue-sky-business-concept-idea_1323-185.jpg?semt=ais_hybrid&w=740'
                }
                alt="인증 사진"
                className="object-cover object-top w-full h-full shadow-md rounded-2xl"
              />

              <div className="absolute w-full text-center text-white transform -translate-x-1/2 bottom-5 left-1/2 text-bn1">
                {takenTime ? (
                  <span className="w-full">{formatExifDate(takenTime)}</span>
                ) : (
                  <span className="w-full">촬영 시간 정보 없음</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full bg-white">
          <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 bg-white custom601:mb-6">
            <BottomButton
              title="다시 인증"
              onClick={() => {}}
              disabled="progress"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 bg-white custom601:mb-6">
            <BottomButton title="홈으로" onClick={() => {}} disabled="false" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationFailure;
