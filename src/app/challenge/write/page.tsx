import Header from '@/components/shared/Header';
import { CameraIcon, CancelIcon } from '@public/icons/Challenge/write';
import React from 'react';

const Write = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header type="default" title="챌린지 생성" backIcon={<CancelIcon />} />

      <div className="flex flex-col w-full gap-5 px-6 mt-5">
        <div className="flex flex-col w-full gap-2">
          <div className="text-bn3">대표 이미지</div>
          <div className="flex flex-col gap-3 items-center justify-center w-full bg-gray-100 h-[10.8rem] rounded-xl">
            <CameraIcon />
            <button className="border-gray-200 border-[1px] bg-gray-white px-4 py-2 rounded-md text-bn3">
              사진 선택
            </button>
          </div>
        </div>

        <div>
          <div>카테고리</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Write;
