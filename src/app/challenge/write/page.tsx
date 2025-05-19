'use client';

import React, { useState } from 'react';
import DropdownSelector from '@/components/Challenge/DropdownSelector';
import Header from '@/components/shared/Header';
import { CameraIcon, CancelIcon } from '@public/icons/Challenge/write';
import Input from '@/components/Challenge/Input';
import Image from 'next/image';
import BottomButton from '@/components/shared/BottomButton';

interface ChallengeData {
  category: string;
  title: string;
  period: string;
  difficulty: string;
  description: string;
}

const Write = () => {
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [inputs, setInputs] = useState<ChallengeData>({
    category: '',
    title: '',
    period: '',
    difficulty: '',
    description: '',
  });

  const categories = ['건강', '생산성', '창의성', '학습'];
  const difficulty = ['상', '중', '하'];

  const handleChange = (key: keyof ChallengeData, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setImgUrl(file);
    } else {
      alert('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  const isValid = () => {
    return (
      inputs.category &&
      inputs.title &&
      inputs.period &&
      inputs.difficulty &&
      inputs.description &&
      imgUrl
    );
  };

  return (
    <div className="flex flex-col w-full h-full overflow-scroll">
      <Header
        type="default"
        title="챌린지 생성"
        backIcon={<CancelIcon />}
        backClick="/challenge"
      />

      <div className="flex flex-col w-full gap-5 px-6 mt-5">
        {/* 대표 이미지 */}
        <div className="flex flex-col w-full gap-2">
          <div className="text-bn3">대표 이미지</div>
          {imgUrl && typeof imgUrl === 'object' ? (
            <div className="w-full h-[10.8rem] relative" key={imgUrl.name}>
              <Image
                src={URL.createObjectURL(imgUrl)}
                alt="Uploaded Preview"
                width={200}
                height={172.8}
                className="w-full h-full rounded-xl"
              />
              <div
                className="absolute top-[0.62rem] right-[0.62rem]"
                onClick={() => setImgUrl(null)}
              >
                <CancelIcon fill="#F7F7F7" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center w-full bg-gray-100 h-[10.8rem] rounded-xl">
              <CameraIcon />
              <input
                type="file"
                name="ChallengeImg"
                id="ChallengeImg"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <label
                className="border-gray-200 border-[1px] bg-gray-white px-4 py-2 rounded-md text-bn3"
                htmlFor="ChallengeImg"
              >
                사진 선택
              </label>
            </div>
          )}
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">카테고리</div>
          <DropdownSelector
            options={categories}
            selectedOption={inputs.category}
            onSelect={(category) => handleChange('category', category)}
          />
        </div>

        {/* 챌린지 제목 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">챌린지 제목</div>
          <Input
            value={inputs.title}
            onChange={(title) => setInputs((prev) => ({ ...prev, title }))}
            placeholder="챌린지 제목을 입력해주세요"
          />
        </div>

        {/* 기간 설정 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">기간 설정</div>
          <Input
            value={inputs.period}
            onChange={(period) => setInputs((prev) => ({ ...prev, period }))}
            placeholder="기간을 입력해주세요."
            type="number"
          />
        </div>

        {/* 난이도 설정 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">난이도</div>
          <DropdownSelector
            options={difficulty}
            selectedOption={inputs.difficulty}
            onSelect={(difficulty) => handleChange('difficulty', difficulty)}
          />
        </div>

        {/* 자세한 설명 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">자세한 설명</div>
          <Input
            value={inputs.description}
            onChange={(description) =>
              setInputs((prev) => ({ ...prev, description }))
            }
            placeholder={`챌린지에 대한 자세한 설명을 작성해 주세요.\n\n\n(예시: "하루 30분 운동을 30일 동안 꾸준히 실천하는 챌린지입니다.")`}
            type="textarea"
          />
        </div>
      </div>

      <div className="w-full px-6 pt-3 border-t h-fit border-gray-50 mt-[0.62rem]">
        <BottomButton
          title="등록"
          onClick={() => {}}
          disabled={isValid() ? 'false' : 'true'}
        />
      </div>
    </div>
  );
};

export default Write;
