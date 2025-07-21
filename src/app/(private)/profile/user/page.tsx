'use client';

import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useGetUserRole } from '@/service/shared/shared.query';
import { CameraIcon, PenIcon } from '@public/icons/Profile';
import { FireIcon } from '@public/icons/shared';
import Image from 'next/image';
import React, { useState } from 'react';

const challengeCategories = [
  { id: 1, name: '참가중', apiValue: 'Participation' },
  { id: 2, name: '완료', apiValue: 'Complete' },
  { id: 3, name: '개설', apiValue: 'Open' },
];

const ProfileDetail = () => {
  const { data, isLoading } = useGetUserRole();
  const UserData = data?.data?.UserData;

  const [activeCategory, setActiveCategory] = useState(1);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header type="default" title="" />

      <div className="flex flex-col w-full h-full overflow-scroll scrollbar-hide custom601:h-[70%] pb-28 gap-8 items-center">
        <div className="relative w-[100px] h-[100px] rounded-full flex-shrink-0">
          <Image
            src={UserData?.profileImg}
            alt="Profile Image"
            width={100}
            height={100}
            className="object-cover object-top rounded-full"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-white border rounded-full border-gray-50">
            <CameraIcon />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <FireIcon width="18" height="19" />
            <div className="text-gray-500 text-b3">연속 인증 5일</div>
          </div>

          <div className="flex items-center">
            <div className="text-h3">userName님</div>
            <PenIcon />
          </div>
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
                {item.name} 3개
              </div>
            ))}
          </div>

          {/* 챌린지 map */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
