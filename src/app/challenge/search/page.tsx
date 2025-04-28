'use client';

import React from 'react';
import Header from '@/components/shared/Header';
import { ClockIcon, CancelIocn } from '@public/icons/Challenge';
import SearchHistory from '@/data/Challenge/Search/SearchHistory.json';
import { MagnifyingGlassIcon } from '@public/icons/shared';

const ChallengeSearch = () => {
  const [isSearchbarVisible, setIsSearchbarVisiable] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className="flex flex-col w-full h-full text-gray-black">
      <Header
        type="search"
        searchText={searchText}
        setSearchText={setSearchText}
        isSearchbarVisible={isSearchbarVisible}
        setIsSearchbarVisiable={setIsSearchbarVisiable}
        backClick={'/challenge'}
      />

      <div className="flex flex-col px-6 mt-5">
        {searchText.length > 0 ? (
          //RecommendSearchWord
          <div className="flex flex-col justify-center ">
            <div className="flex gap-[0.62rem] py-[0.88rem]">
              <MagnifyingGlassIcon width="24" height="24" fill="#DEDEDE" />
              <div className="text-gray-600 text-b1">하루 물 마시기 챌린지</div>
            </div>
          </div>
        ) : (
          //SearchHistory
          <>
            <div className="flex items-center justify-between">
              <div className="text-he">최근 검색어</div>
              <div className="text-gray-300 text-fn">전체삭제</div>
            </div>

            {SearchHistory.data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full py-[0.88rem]"
              >
                <div className="flex items-center gap-[0.62rem]">
                  <ClockIcon />
                  <div className="text-gray-600 text-b1">{item.name}</div>
                </div>
                <CancelIocn />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeSearch;
