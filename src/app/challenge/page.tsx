'use client';

import React, { useState } from 'react';
import { PlusIcon, ResetIcon } from '@public/icons/Challenge';
import { ArrowIcon, MagnifyingGlassIcon } from '@public/icons/shared';
import FilterModal from '@/components/Challenge/FilterModal';
import ChallengeContent from '@/components/Challenge/ChallengeContent';
import Header from '@/components/shared/Header';
import { ChallengeType, ChallengeFilter } from '@/types/Challenge';
import { useGetChallenge } from '@/service/Challenge/challenge.query';
import Loading from '@/components/shared/Loading';

const challengeCategories = [
  { id: 1, name: '전체', apiValue: undefined },
  { id: 2, name: '건강', apiValue: 'Health' },
  { id: 3, name: '생산성', apiValue: 'Productivity' },
  { id: 4, name: '창의성', apiValue: 'Creativity' },
  { id: 5, name: '학습', apiValue: 'Learning' },
];

const filterOptions = {
  기간: ['전체', '30일', '7일'],
  난이도: ['전체', '하', '중', '상'],
  정렬: ['인기순', '최신순'],
};

const Challenge = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [filters, setFilters] = useState({
    기간: '전체',
    난이도: '전체',
    정렬: '인기순',
  });
  const [activeFilterKey, setActiveFilterKey] = useState<
    null | keyof typeof filters
  >(null);

  const mappedCategory = challengeCategories.find(
    (c) => c.id === activeCategory
  )?.apiValue;

  const mappedDifficulty =
    filters.난이도 === '하'
      ? 'easy'
      : filters.난이도 === '중'
        ? 'normal'
        : filters.난이도 === '상'
          ? 'hard'
          : undefined;

  let dayStart: string | undefined;
  let dayEnd: string | undefined;

  const periodRegex = /^(\d+)일~(\d+)일$/;

  if (filters.기간 === '7일') {
    dayStart = '7';
    dayEnd = '7';
  } else if (filters.기간 === '30일') {
    dayStart = '30';
    dayEnd = '30';
  } else if (periodRegex.test(filters.기간)) {
    const match = filters.기간.match(periodRegex);
    if (match) {
      dayStart = match[1];
      dayEnd = match[2];
    }
  }

  const filterParams: ChallengeFilter = {
    category: mappedCategory,
    difficulty: mappedDifficulty,
    dayStart,
    dayEnd,
    page: 1,
    size: 20,
  };

  const { data: ChallengeData, isLoading } = useGetChallenge(filterParams);

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== '전체' && v !== '인기순'
  );

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
    setActiveFilterKey(null);
  };

  const resetFilters = () => {
    setFilters({ 기간: '전체', 난이도: '전체', 정렬: '인기순' });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full text-gray-black">
      <Header
        type="title"
        title="챌린지"
        icon={<MagnifyingGlassIcon width="24" height="24" fill="#1F1F1F" />}
        iconClick={'/challenge/search'}
        icon2={<PlusIcon />}
        iconClick2="/challenge/write"
      />
      <div className="flex justify-between px-6 mt-4 border-b border-gray-100">
        {challengeCategories.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-center w-16 text-he pb-[0.44rem] border-b hover:cursor-pointer transition-all duration-300 ease-out ${
              item.id === activeCategory
                ? 'border-gray-black text-black'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => setActiveCategory(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-8 py-2 mt-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {hasActiveFilters && (
          <div
            onClick={resetFilters}
            className="flex-shrink-0 flex items-center gap-1 h-[2.1rem] px-3 border border-gray-200 rounded-full cursor-pointer"
          >
            <ResetIcon />
          </div>
        )}
        {Object.entries(filters).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setActiveFilterKey(key as keyof typeof filters)}
            className={`flex-shrink-0 flex items-center gap-1 h-[2.1rem] px-3 rounded-full cursor-pointer whitespace-nowrap min-w-fit ${
              value !== '전체' && value !== '인기순'
                ? 'bg-gray-black text-white'
                : 'border border-gray-200 text-black'
            }`}
          >
            {key === '정렬' ? value : `${key} ${value === '전체' ? '' : value}`}
            <ArrowIcon location="down" />
          </div>
        ))}
      </div>
      {activeFilterKey !== null && (
        <FilterModal
          isOpen={true}
          onClose={() => setActiveFilterKey(null)}
          title={`${activeFilterKey} 선택`}
          options={filterOptions[activeFilterKey]}
          selectedOption={filters[activeFilterKey]}
          onSelect={(option) => updateFilter(activeFilterKey, option)}
          filterKey={activeFilterKey}
        />
      )}
      <div className="flex-1 h-0 min-h-0 px-8 pb-16 mt-2 overflow-y-scroll scrollbar-hide -webkit-overflow-scrolling-touch overscroll-contain">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          {ChallengeData?.data?.challenges?.map((item: ChallengeType) => (
            <ChallengeContent
              key={item.id}
              id={item.id}
              count={20}
              title={item.title}
              imgUrl={item.imgURL}
              days={Number(item.day)}
              difficulty={item.difficulty}
              createrName={item.User.name}
              createrImgUrl={item.User.profileImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
