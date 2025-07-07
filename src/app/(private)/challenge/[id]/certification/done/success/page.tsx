'use client';

import Header from '@/components/shared/Header';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import {
  PointModalCheckIcon,
  ShapeQuestionIcon,
} from '@public/icons/Challenge/certification';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '@/style/ProgressSlider.css';
import Image from 'next/image';
import { formatExifDate } from '@/lib/utils/formatExifDate';
import { CoinIcon } from '@public/icons/Challenge/progress';
import BottomButton from '@/components/shared/BottomButton';
import { motion, AnimatePresence } from 'framer-motion';

const CertificationSuccess = () => {
  const router = useRouter();
  const path = usePathname();
  const challengeId = path.split('/').slice(0, 4)[2];
  const searchParams = useSearchParams();
  const image = searchParams.get('image');

  const [takenTime, setTakenTime] = useState<string | null>(null);

  useEffect(() => {
    const time = sessionStorage.getItem('cert-taken-time');
    if (time) setTakenTime(time);
  }, []);

  const [showPointToast, setShowPointToast] = useState(false);
  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setShowPointToast(true);
    }, 500);

    const fadeOutTimeout = setTimeout(() => {
      setShowPointToast(false);
    }, 3000);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
    };
  }, []);

  useStatusBarBridge({
    backgroundColor: '#EBF5FF',
    translucent: true,
    bottomBackgroundColor: '#EBF5FF',
  });

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-lg text-gray-500">
        이미지 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-full overflow-y-auto bg-blue-100">
      <Header
        type="default"
        title="인증하기"
        backClick={`/challenge/${challengeId}/certification`}
        icon={<ShapeQuestionIcon color="black" />}
      />

      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="relative flex flex-col justify-center gap-8 px-6">
          <div className="flex flex-col justify-center gap-5">
            <div>
              <div className="text-gray-600 text-b3">
                챌린지 진행 10일차 인증 완료!
              </div>
              <div className="text-h1">하루 물 2L 마시기</div>
            </div>

            <div className="flex flex-col gap-[0.62rem] w-full">
              <RangeSlider
                min={30}
                max={90}
                step={1}
                value={[30, 80]}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={false}
              />

              <div className="flex justify-between text-gray-400 text-c2">
                <span>2024.01.22</span>
                <span>2024.03.22</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-5 bg-white rounded-2xl shadow-[0px_6px_6px_0px_rgba(92,92,92,0.12)]">
            <div className="relative h-[300px] w-[300px]">
              <Image
                width={300}
                height={300}
                src={image}
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

          <div className="absolute bottom-[-30px] right-[16px] bg-primary-light w-fit h-fit p-[0.45rem] rounded-full shadow-certification-special">
            <CoinIcon disabled={false} width={72} height={72} />
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <AnimatePresence>
            {showPointToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-[0.31rem] px-6 py-[0.62rem] bg-gray-600 w-fit rounded-full text-white text-bn3"
              >
                <PointModalCheckIcon />
                <div>2000 포인트가 적립되었어요!</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 bg-blue-100 border-t border-gray-50 custom601:mb-6">
            <BottomButton
              title="홈으로"
              onClick={() => {
                router.push('/');
              }}
              disabled="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationSuccess;
