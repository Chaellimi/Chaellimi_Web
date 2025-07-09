'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface OwnProps {
  isActive: boolean;
  progress?: number;
  imgURL: string;
  time?: string;
  title: string;
  certificationLink: string;
  progressLink: string;
}

const ActiveChallenge = ({
  isActive,
  progress,
  imgURL,
  time,
  title,
  certificationLink,
  progressLink,
}: OwnProps) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col w-[12.5rem] border-[1px] border-gray-100 rounded-lg p-[0.88rem] gap-[0.62rem] min-w-[12.5rem] max-w-[12.5rem] cursor-pointer"
      onClick={() => {
        router.push(progressLink);
      }}
    >
      {progress && (
        <div
          className={`text-c1 w-fit pr-[0.38rem] pl-[0.38rem] pt-[0.19rem] pb-[0.19rem] rounded
          ${isActive ? 'text-gray-400 bg-gray-100' : 'text-primary-default bg-primary-light'}`}
        >
          {progress >= 100 ? '챌린지 완료!' : `진행률 ${progress}%`}
        </div>
      )}

      <div className="flex items-center gap-[0.62rem] w-full">
        <div className="w-[2.875rem] h-[2.875rem] relative">
          <Image
            src={imgURL}
            alt=""
            width={46}
            height={46}
            className="object-cover object-top w-full h-full rounded-xl"
          />
        </div>
        <div>
          {/* <div className="text-c2 text-gray-black">{time}</div> */}
          <div className="text-b2 text-gray-black">{title}</div>
        </div>
      </div>

      {progress && (
        <button
          className={`flex items-center justify-center w-full p-[0.62rem] text-bn3 text-white rounded-lg
          ${isActive ? 'bg-gray-300' : 'bg-primary-default'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isActive) {
              router.push(certificationLink);
            }
          }}
        >
          {progress >= 100
            ? '챌린지 완료'
            : isActive
              ? '오늘 인증 완료!'
              : '인증하러 가기'}
        </button>
      )}
    </div>
  );
};

export default ActiveChallenge;
