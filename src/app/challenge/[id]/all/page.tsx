'use client';

import React from 'react';
import Header from '@/components/shared/Header';
import { CoinIcon, InfoIcon } from '@public/icons/Challenge/progress';
import { useParams } from 'next/navigation';

const ALl = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col w-full h-full pb-4 overflow-y-auto bg-primary-light gap-[0.62rem]">
      <Header
        type="default"
        title="진행사항"
        icon={<InfoIcon />}
        backClick={`/challenge/${id}/progress`}
      />

      <div className="flex flex-col gap-[0.62rem] w-full items-center px-6">
        <div className="w-full px-[0.62rem] py-5 bg-gray-white rounded-[1.25rem]">
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between gap-2"
              >
                <div className="bg-primary-light w-fit h-fit p-[0.45rem] rounded-full">
                  <CoinIcon disabled={false} />
                </div>
                <div className="text-gray-500 text-c1">{index + 1}일차</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALl;
