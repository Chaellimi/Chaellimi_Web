'use client';

import TextLogo from '@/components/shared/TextLogo';
import {
  PointIcon,
  MagnifyingGlassIcon,
  SearchBarCancelIcon,
  ArrowIcon,
} from '@public/icons/Home';
import Image from 'next/image';
import React from 'react';
import Banner from '@public/images/HomeBanner.png';
import ActiveChallenge from '@/components/Home/ActiveChallenge';
import HotChallenge from '@/components/Home/HotChallenge';
import ActiveChallengeData from '@/data/Home/ChallengeState.json';
import HotChallengeData from '@/data/Home/ChallengeHot.json';

const Home = () => {
  const [isSearchbarVisible, setIsSearchbarVisiable] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const handleChangeSearchText = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(e.target.value);
    if (searchText.length > 0) {
      setIsSearchbarVisiable(true);
    } else {
      setIsSearchbarVisiable(false);
    }
  };

  return (
    <div className="w-full h-full pl-10 pr-10">
      <header className="flex items-center justify-between w-full h-11 pr-[0.31rem] pl-[0.31rem]">
        <TextLogo width={75} />
        <PointIcon />
      </header>

      <div className="flex items-center justify-between w-full h-12 p-3 bg-gray-50 rounded-xl mb-[0.62rem]">
        <div className="flex items-center w-full gap-2">
          <MagnifyingGlassIcon isFocus={isSearchbarVisible} />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchText}
            onChange={handleChangeSearchText}
            className="w-full placeholder-gray-300 outline-none caret-black caret-w-[1.5rem] bg-gray-50 mr-2"
          />
        </div>
        {isSearchbarVisible ? (
          <div
            className="flex items-center justify-between"
            onClick={() => {
              setSearchText('');
            }}
          >
            <SearchBarCancelIcon />
          </div>
        ) : null}
      </div>

      <div>
        <Image src={Banner} width={413} alt="" />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <div className="flex items-center justify-between">
          <div className="text-he">참여중인 챌린지</div>
          <div className="text-gray-300 text-fn">2/3 완료</div>
        </div>

        <div className="flex w-full overflow-scroll gap-[0.62rem]">
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

      <div className="flex flex-col gap-2 mt-5">
        <div className="flex items-center justify-between">
          <div className="text-he">요즘 뜨는 챌린지</div>
          <ArrowIcon />
        </div>
        <div className="flex overflow-scroll gap-[0.62rem]">
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
  );
};

export default Home;
