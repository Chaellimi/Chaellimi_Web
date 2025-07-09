'use client';

import React, { useEffect, useState } from 'react';
import DropdownSelector from '@/components/Challenge/DropdownSelector';
import Header from '@/components/shared/Header';
import { CameraIcon, CancelIcon } from '@public/icons/Challenge/write';
import Input from '@/components/Challenge/Input';
import Image from 'next/image';
import BottomButton from '@/components/shared/BottomButton';
import {
  useCreateChallenge,
  useUpdateChallenge,
} from '@/service/Challenge/challenge.mutation';
import { ChallengeWriteType } from '@/types/Challenge';
import { useUploadImg } from '@/service/shared/shared.mutation';
import { SpinLogo } from '@public/icons/shared';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { challengeKeys } from '@/service/Challenge/challenge.key';
import { useGetChallengeById } from '@/service/Challenge/challenge.query';
import Loading from '@/components/shared/Loading';

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
  const router = useRouter();
  const editMode = useSearchParams().get('mode') === 'edit';
  const id = useSearchParams().get('id');

  const { data, isLoading: ChallengeLoading } = useGetChallengeById(Number(id));
  const editData = data?.data?.challenge;

  const [inputs, setInputs] = useState<Partial<ChallengeWriteType>>({});
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string>(
    editData?.imgURL
  );

  useEffect(() => {
    if (editMode && editData) {
      setInputs({
        title: editData.title,
        category: editData.category,
        day: editData.day.toString(),
        difficulty: editData.difficulty,
        description: editData.description,
      });
      setUploadedImgUrl(editData.imgURL);
    }
  }, [editMode, editData]);

  const queryClient = useQueryClient();
  const { mutateAsync: uploadImage, isPending: isPendingUploadImg } =
    useUploadImg();
  const { mutate: createChallenge } = useCreateChallenge();
  const { mutate: updateChallenge } = useUpdateChallenge();

  const handleChange = (key: keyof ChallengeWriteType, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    if (!file || !file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadImage(formData);
      setUploadedImgUrl(result.data.fileUrl);
    } catch (err) {
      alert('이미지 업로드에 실패했습니다.');
      console.log(err);
    }
  };

  const isValid = () => {
    if (!uploadedImgUrl) {
      return false;
    }
    return (
      !!inputs.category &&
      !!inputs.title &&
      !!inputs.day &&
      !!inputs.difficulty &&
      !!inputs.description
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isValid()) return;

    setIsSubmitting(true);

    const payload = {
      imgURL: uploadedImgUrl,
      category: inputs.category as
        | 'health'
        | 'productivity'
        | 'creativity'
        | 'learning',
      title: inputs.title!,
      day: inputs.day!,
      difficulty: inputs.difficulty as 'hard' | 'normal' | 'easy',
      description: inputs.description!,
    } as ChallengeWriteType;

    if (editMode && id) {
      updateChallenge(
        { id: Number(id), data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey[0] === challengeKeys.useGetChallenge,
            });
            router.push('/challenge');
          },
        }
      );
    } else {
      createChallenge(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === challengeKeys.useGetChallenge,
          });
          router.push('/challenge');
        },
      });
    }
  };

  if (ChallengeLoading || isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full overflow-scroll">
      <Header
        type="default"
        title={`챌린지 ${editMode ? '수정' : '생성'}`}
        backIcon={<CancelIcon />}
        backClick="/challenge"
      />

      <div className="flex flex-col w-full gap-5 px-6 mt-5">
        {/* 대표 이미지 */}
        <div className="flex flex-col w-full gap-2">
          <div className="text-bn3">대표 이미지</div>
          {isPendingUploadImg ? (
            <div className="flex items-center justify-center w-full h-[10.8rem] bg-gray-100 rounded-xl">
              <SpinLogo width={60} height={54} />
            </div>
          ) : uploadedImgUrl ? (
            <div className="w-full h-[10.8rem] relative" key={uploadedImgUrl}>
              <Image
                src={uploadedImgUrl}
                alt="Uploaded Preview"
                width={200}
                height={172.8}
                className="w-full h-full rounded-xl"
              />
              <div
                className="absolute top-[0.62rem] right-[0.62rem]"
                onClick={() => setUploadedImgUrl('')}
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

      <div className="w-full px-6 pt-3 border-t h-fit border-gray-50 mt-[0.62rem] custom601:mb-6">
        <BottomButton
          title={editMode ? '수정' : '등록'}
          onClick={handleSubmit}
          disabled={isSubmitting ? 'progress' : isValid() ? 'false' : 'true'}
        />
      </div>
    </div>
  );
};

export default Write;
