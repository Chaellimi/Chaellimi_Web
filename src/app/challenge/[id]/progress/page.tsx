'use client';

import React from 'react';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import Header from '@/components/shared/Header';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { CoinIcon, InfoIcon } from '@public/icons/Challenge/progress';
import '@/style/ProgressSlider.css';
import { ArrowIcon } from '@public/icons/shared';
import BottomButton from '@/components/shared/BottomButton';

const Progress = () => {
  useStatusBarBridge({
    backgroundColor: '#FFF0E5',
    translucent: true,
    bottomBackgroundColor: '#FFF0E5',
  });

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto ">
      <div className="bg-primary-light">
        <Header type="default" title="진행사항" icon={<InfoIcon />} />

        <div className="flex flex-col w-full gap-5 px-6 pt-[0.62rem] pb-5 mt-4 bg-primary-light">
          <div>
            <div className="text-gray-600 text-b3">챌린지 진행 10일차</div>
            <div className="text-gray-black text-h1">하루 물 2L 마시기</div>
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

          <div className="flex flex-col gap-[0.62rem] w-full items-center">
            <div className="flex flex-col gap-[0.62rem] w-full items-center">
              <div className="w-full px-[0.62rem] py-5 bg-gray-white rounded-[1.25rem]">
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-between gap-2"
                    >
                      <div className="bg-primary-light w-fit h-fit p-[0.45rem] rounded-full">
                        <CoinIcon disabled={false} />
                      </div>
                      <div className="text-gray-500 text-c1">
                        {index + 1}일차
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center rounded-[1.25rem] bg-gray-white w-fit px-4 py-[0.62rem] text-bn3 text-gray-600">
              전체보기
              <ArrowIcon
                location="right"
                width="17"
                height="16"
                fill="#5C5C5C"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="text-gray-black text-b2">적립내역</div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between w-full py-5 border-b border-gray-50">
            <div className="flex items-center gap-[0.88rem]">
              <div className="text-gray-400 text-fn">24.01.01</div>
              <div className="text-gray-black text-b3">10일차</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-primary-hover text-bn2">+2000P</div>
              <div className="text-gray-400 text-c1">99,999P</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full px-6 pt-3 bg-white border-t border-gray-50">
        <BottomButton
          title="인증하러 가기"
          onClick={() => {}}
          disabled="false"
        />
      </div>
    </div>
  );
};

export default Progress;
