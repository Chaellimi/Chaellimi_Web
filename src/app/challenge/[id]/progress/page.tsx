'use client';

import React from 'react';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import Header from '@/components/shared/Header';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { InfoIcon } from '@public/icons/Challenge/progress';
import '@/style/ProgressSlider.css';

const Progress = () => {
  useStatusBarBridge({
    backgroundColor: '#FFF0E5',
    translucent: true,
    bottomBackgroundColor: '#FFF0E5',
  });

  return (
    <div className="min-h-screen bg-primary-light">
      <Header type="default" title="진행사항" icon={<InfoIcon />} />

      <div className="flex flex-col w-full gap-5 px-6 mt-4">
        <div>
          <div className="text-gray-600 text-b3">챌린지 진행 10일차</div>
          <div className="text-gray-black text-h1">하루 물 2L 마시기</div>
        </div>

        <div className="w-full">
          <div className="relative w-full pt-6">
            <RangeSlider
              min={30}
              max={90}
              step={1}
              value={[30, 80]}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={false}
            />

            <div className="flex justify-between px-1 mt-2 text-gray-400 text-b4">
              <span>2024.01.22</span>
              <span>2024.03.22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
