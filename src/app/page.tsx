'use client';

import { PointIcon } from '@public/icons/Home';
import Image from 'next/image';
import React, { useState } from 'react';
import Banner from '@public/images/HomeBanner.png';
import ActiveChallenge from '@/components/Home/ActiveChallenge';
import HotChallenge from '@/components/Home/HotChallenge';
import ActiveChallengeData from '@/data/Home/ChallengeState.json';
import HotChallengeData from '@/data/Home/ChallengeHot.json';
import Header from '@/components/shared/Header';
import { ArrowIcon } from '@public/icons/shared';

const Home = () => {
  const [isSearchbarVisible, setIsSearchbarVisiable] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <div className="w-full h-full">
      <Header type="logo" icon={<PointIcon />} iconClick="/point" />

      <div className="px-6">
        {/* Search Bar */}
        <Header
          type="searchNoBack"
          searchText={searchText}
          setSearchText={setSearchText}
          isSearchbarVisible={isSearchbarVisible}
          setIsSearchbarVisiable={setIsSearchbarVisiable}
        />

        {/* Main Content */}
        <div>
          <Image src={Banner} width={413} alt="" className="mt-[0.88rem]" />
        </div>

        {/* Active Challenge */}
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center justify-between">
            <div className="text-he">참여중인 챌린지</div>
            <div className="text-gray-300 text-fn">2/3 완료</div>
          </div>

          <div className="flex w-full overflow-scroll gap-[0.62rem] scrollbar-hide">
            {ActiveChallengeData.challenges.map((item, index) => {
              return (
                <ActiveChallenge
                  key={index}
                  isActive={item.certificationState}
                  progress={item.progress}
                  title={item.title}
                  time={item.certificationTime}
                  imgURL={item.imgUrl}
                />
              );
            })}
          </div>
        </div>

        {/* Hot Challenge */}
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center justify-between">
            <div className="text-he">요즘 뜨는 챌린지</div>
            <ArrowIcon width="24" height="24" location="right" />
          </div>
          <div className="flex overflow-scroll gap-[0.62rem] scrollbar-hide">
            {HotChallengeData.challenges.map((item, index) => (
              <div key={index}>
                <HotChallenge
                  count={item.activePeopleCount}
                  title={item.title}
                  imgUrl={item.imgUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
