'use client';

import React, { useState } from 'react';
import DropdownSelector from '@/components/Challenge/DropdownSelector';
import Header from '@/components/shared/Header';
import { CameraIcon, CancelIcon } from '@public/icons/Challenge/write';
import Input from '@/components/Challenge/Input';
import Image from 'next/image';
import BottomButton from '@/components/shared/BottomButton';
import { useCreateChallenge } from '@/service/Challenge/challenge.mutation';
import { ChallengeWriteType } from '@/types/Challenge';

const difficultyOptions = [
  { label: '상', value: 'hard' },
  { label: '중', value: 'normal' },
  { label: '하', value: 'easy' },
];

const categoryOptions = [
  { name: '건강', apiValue: 'Health' },
  { name: '생산성', apiValue: 'Productivity' },
  { name: '창의성', apiValue: 'Creativity' },
  { name: '학습', apiValue: 'Learning' },
];

const Write = () => {
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [inputs, setInputs] = useState<Partial<ChallengeWriteType>>({});

  const handleChange = (key: keyof ChallengeWriteType, value: string) => {
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
      !!inputs.category &&
      !!inputs.title &&
      !!inputs.day &&
      !!inputs.difficulty &&
      !!inputs.description &&
      !!imgUrl
    );
  };

  const { mutate: createChallenge } = useCreateChallenge();

  const handleSubmit = async () => {
    if (!isValid()) return;

    createChallenge({
      imgURL: '',
      category: inputs.category as
        | 'health'
        | 'productivity'
        | 'creativity'
        | 'learning',
      title: inputs.title!,
      day: inputs.day!,
      difficulty: inputs.difficulty as 'hard' | 'normal' | 'easy',
      description: inputs.description!,
    });
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
            options={categoryOptions.map((c) => c.name)}
            selectedOption={
              categoryOptions.find((c) => c.apiValue === inputs.category)
                ?.name ?? ''
            }
            onSelect={(label) => {
              const selected = categoryOptions.find((c) => c.name === label);
              if (selected) handleChange('category', selected.apiValue);
            }}
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
            value={inputs.day}
            onChange={(day) => setInputs((prev) => ({ ...prev, day }))}
            placeholder="기간을 입력해주세요."
            type="number"
          />
        </div>

        {/* 난이도 설정 */}
        <div className="flex flex-col gap-2">
          <div className="text-bn3">난이도</div>
          <DropdownSelector
            options={difficultyOptions.map((d) => d.label)}
            selectedOption={
              difficultyOptions.find((d) => d.value === inputs.difficulty)
                ?.label || ''
            }
            onSelect={(label) => {
              const selected = difficultyOptions.find((d) => d.label === label);
              if (selected) handleChange('difficulty', selected.value);
            }}
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
          onClick={handleSubmit}
          disabled={isValid() ? 'false' : 'true'}
        />
      </div>
    </div>
  );
};

export default Write;
