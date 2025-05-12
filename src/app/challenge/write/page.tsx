'use client';

import React, { useState } from 'react';
import DropdownSelector from '@/components/Challenge/DropdownSelector';
import Header from '@/components/shared/Header';
import { CameraIcon, CancelIcon } from '@public/icons/Challenge/write';
import Input from '@/components/Challenge/Input';

interface ChallengeData {
  category: string;
  title: string;
  period: string;
  difficulty: string;
  description: string;
}

const Write = () => {
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    category: '',
    title: '',
    period: '',
    difficulty: '',
    description: '',
  });
  const categories = ['운동', '공부', '취미', '기타'];

  const handleCategoryChange = (category: string) => {
    setChallengeData((prev) => ({ ...prev, category }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header type="default" title="챌린지 생성" backIcon={<CancelIcon />} />

      <div className="flex flex-col w-full gap-5 px-6 mt-5">
        {/* 대표 이미지 */}
        <div className="flex flex-col w-full gap-2">
          <div className="text-bn3">대표 이미지</div>
          <div className="flex flex-col gap-3 items-center justify-center w-full bg-gray-100 h-[10.8rem] rounded-xl">
            <CameraIcon />
            <button className="border-gray-200 border-[1px] bg-gray-white px-4 py-2 rounded-md text-bn3">
              사진 선택
            </button>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">카테고리</div>
          <DropdownSelector
            options={categories}
            selectedOption={challengeData.category}
            onSelect={(category) => handleCategoryChange(category)}
          />
        </div>

        {/* 챌린지 제목 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">챌린지 제목</div>
          <Input
            value={challengeData.title}
            onChange={(title) =>
              setChallengeData((prev) => ({ ...prev, title }))
            }
            placeholder="챌린지 제목을 입력해주세요"
          />
        </div>

        {/* 기간 설정 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">기간 설정</div>
          <Input
            value={challengeData.period}
            onChange={(period) =>
              setChallengeData((prev) => ({ ...prev, period }))
            }
            placeholder="기간을 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
