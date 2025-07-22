/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ChallengeContent from '@/components/Challenge/ChallengeContent';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useGetProfileDetail } from '@/service/Profile/profile.query';
import { useEditUser } from '@/service/Profile/profile.mutation';
import {
  useGetUserRole,
  useGetBookmarkList,
  usePostUploadImg,
} from '@/service/shared/shared.query';
import { useBookmark } from '@/hooks/useBookmark';
import { useQueryClient } from '@tanstack/react-query';
import { CameraIcon, PenIcon } from '@public/icons/Profile';
import { FireIcon } from '@public/icons/shared';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { sharedKeys } from '@/service/shared/shared.key';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';

const challengeCategories = [
  { id: 1, name: '참가중', apiValue: 'participating' },
  { id: 2, name: '완료', apiValue: 'completed' },
  { id: 3, name: '개설', apiValue: 'created' },
];

const ProfileDetail = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUserRole();
  const UserData = data?.data?.UserData;

  const { data: profileDetail, isLoading: isLoadingProfileDetail } =
    useGetProfileDetail();
  const profileData = profileDetail?.data;

  const { data: bookmarkData } = useGetBookmarkList();

  const editUserMutation = useEditUser();
  const uploadImgMutation = usePostUploadImg();

  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [editName, setEditName] = useState(UserData?.name);

  useEffect(() => {
    setEditName(UserData?.name);
  }, [UserData?.name]);

  useStatusBarBridge({
    backgroundColor: '#FFF',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previousData = queryClient.getQueryData([sharedKeys.useGetUserRole]);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const uploadResponse = await uploadImgMutation.mutateAsync(formData);
      const newImageUrl = uploadResponse.data.fileUrl;

      queryClient.setQueryData([sharedKeys.useGetUserRole], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          UserData: {
            ...old?.data?.UserData,
            profileImg: newImageUrl,
          },
        },
      }));
      await editUserMutation.mutateAsync({
        name: UserData?.name || '',
        profileImg: newImageUrl,
      });

      queryClient.invalidateQueries({
        queryKey: [sharedKeys.useGetUserRole],
      });
    } catch (error) {
      console.error('프로필 사진 업로드 실패:', error);
      queryClient.setQueryData([sharedKeys.useGetUserRole], previousData);
    }
  };

  const bookmarkedChallengeIds =
    bookmarkData?.data?.map(
      (bookmark: { challengeId: number }) => bookmark.challengeId
    ) || [];

  const [activeCategory, setActiveCategory] = useState(1);

  const ChallengeWithBookmark = ({ item }: { item: any }) => {
    const challengeData = item.challenge || item;
    const isInitiallyBookmarked = bookmarkedChallengeIds.includes(
      challengeData.id
    );
    const { isBookmarked, toggleBookmark, isLoading } = useBookmark({
      challengeId: challengeData.id,
      initialBookmarkState: isInitiallyBookmarked,
    });

    return (
      <div
        key={challengeData.id}
        className="flex items-center justify-between p-4 bg-white rounded-2xl"
      >
        <ChallengeContent
          key={challengeData.id}
          id={challengeData.id}
          title={challengeData.title}
          imgUrl={challengeData.imgURL}
          days={Number(challengeData.day)}
          count={challengeData.participantCount}
          difficulty={challengeData.difficulty}
          createrName={challengeData.User.name}
          createrImgUrl={challengeData.User.profileImg}
          isChecked={isBookmarked}
          onClickBookmark={toggleBookmark}
          isBookmarkLoading={isLoading}
          link={`/challenge/${challengeData.id}?back=/profile/bookmark`}
        />
      </div>
    );
  };

  const onCheckEditName = async () => {
    if (editName && editName !== UserData?.name) {
      const previousData = queryClient.getQueryData([
        sharedKeys.useGetUserRole,
      ]);

      try {
        queryClient.setQueryData([sharedKeys.useGetUserRole], (old: any) => ({
          ...old,
          data: {
            ...old?.data,
            UserData: {
              ...old?.data?.UserData,
              name: editName,
            },
          },
        }));

        await editUserMutation.mutateAsync({
          name: editName,
          profileImg: UserData?.profileImg || '',
        });

        setIsEditNameMode(false);

        queryClient.invalidateQueries({
          queryKey: [sharedKeys.useGetUserRole],
        });
      } catch (error) {
        console.error('이름 수정 실패:', error);
        queryClient.setQueryData([sharedKeys.useGetUserRole], previousData);
        setEditName(UserData?.name);
      }
    } else {
      setIsEditNameMode(false);
    }
  };

  if (isLoading || isLoadingProfileDetail) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header type="default" title="" />

      <div className="flex flex-col w-full h-full overflow-scroll scrollbar-hide custom601:h-[70%] pb-28 gap-8 items-center">
        <div className="relative w-[100px] h-[100px] rounded-full flex-shrink-0">
          {UserData?.profileImg ? (
            <Image
              src={UserData.profileImg}
              alt="Profile Image"
              width={100}
              height={100}
              className="object-cover object-top rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
              <span className="text-lg font-semibold text-gray-400">
                {UserData?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          )}
          <div
            className="absolute bottom-0 right-0 p-1 transition-colors bg-white border rounded-full cursor-pointer border-gray-50 hover:bg-gray-50"
            onClick={() =>
              document.getElementById('profile-image-input')?.click()
            }
          >
            {uploadImgMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
            ) : (
              <CameraIcon />
            )}
          </div>
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <FireIcon width="18" height="19" />
            <div className="text-gray-500 text-b3">연속 인증 5일</div>
          </div>

          {isEditNameMode ? (
            <div className="flex items-center gap-1">
              <input
                className="border-b w-14 text-h3"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onCheckEditName();
                  }
                }}
                autoFocus
              />
              님
              <div onClick={onCheckEditName} className="cursor-pointer">
                {editUserMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
                ) : (
                  <PenIcon />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="text-h3">{UserData?.name}님</div>
              <div
                onClick={() => setIsEditNameMode(true)}
                className="cursor-pointer"
              >
                <PenIcon />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between px-6 mt-4 border-b border-gray-100">
            {challengeCategories.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-center w-full text-he pb-[0.44rem] border-b hover:cursor-pointer transition-all duration-300 ease-out ${
                  item.id === activeCategory
                    ? 'border-gray-black text-black'
                    : 'border-transparent text-gray-400'
                }`}
                onClick={() => setActiveCategory(item.id)}
              >
                {item.name} {profileData?.[item.apiValue]?.length || 0}개
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 px-6 gap-x-5 gap-y-5">
            {profileData?.[
              challengeCategories[activeCategory - 1].apiValue
            ]?.map((item: any) => (
              <ChallengeWithBookmark
                key={item.challenge?.id || item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
