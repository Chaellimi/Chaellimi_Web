'use client';

import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import { useGetUserRole } from '@/service/shared/shared.query';
import {
  AlarmIcon,
  BookmarkIcon,
  CameraIcon,
  ShopIcon,
  PointIcon,
} from '@public/icons/Profile';
import { ArrowIcon, FireIcon } from '@public/icons/shared';
import Image from 'next/image';
import React from 'react';

const Profile = () => {
  const { data, isLoading } = useGetUserRole();
  const UserData = data?.data?.UserData;
  console.log(UserData);

  useStatusBarBridge({
    backgroundColor: '#F7F7F7',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-6 bg-gray-50">
      <Header type="title" title="마이페이지" icon={<AlarmIcon />} />

      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        {/* 프로필 */}
        <div className="flex items-center justify-between w-full p-4 bg-white rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="relative w-[72px] h-[72px] rounded-full">
              <Image
                src={UserData?.profileImg}
                alt="Profile Image"
                width={72}
                height={72}
                className="object-cover object-top rounded-full"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-white border rounded-full border-gray-50">
                <CameraIcon />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-gray-500 text-b3">
                <FireIcon />
                연속 인증 5일
              </div>
              <div className="text-h3">userName님</div>
            </div>
          </div>

          <div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>
        </div>

        {/* 챌린지 */}
        <div className="flex flex-col w-full p-4 bg-white rounded-2xl gap-[0.62rem]">
          <div className="text-he">챌린지</div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="text-h3">0</div>
              <div className="text-gray-500 text-b3">참가중</div>
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="text-h3">0</div>
              <div className="text-gray-500 text-b3">완료</div>
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="text-h3">0</div>
              <div className="text-gray-500 text-b3">개설</div>
            </div>
          </div>
        </div>

        {/* 상점 */}
        <div className="flex flex-col w-full p-4 bg-white rounded-2xl">
          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <ShopIcon />
              <div className="text-b2">구매내역</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>

          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <PointIcon />
              <div className="text-b2">적립내역</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>

          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <BookmarkIcon />
              <div className="text-b2">저장됨</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>
        </div>

        {/* 기타 */}
        <div className="flex flex-col w-full p-4 bg-white rounded-2xl">
          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <ShopIcon />
              <div className="text-b2">구매내역</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>

          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <PointIcon />
              <div className="text-b2">적립내역</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>

          <div className="flex items-center justify-between w-full py-3">
            <div className="flex items-center gap-[0.62rem]">
              <BookmarkIcon />
              <div className="text-b2">저장됨</div>
            </div>
            <ArrowIcon location="right" width="20" height="20" fill="#A5A5A5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
