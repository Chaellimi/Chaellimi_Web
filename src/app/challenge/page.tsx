'use client';

import React from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ResetIcon,
  UnderArrowIcon,
} from '@public/icons/Challenge';
import FilterModal from '@/components/Challenge/FilterModal';
import ChallengeData from '@/data/Challenge/ChallengeData.json';
import ChallengeContent from '@/components/Challenge/ChallengeContent';

const challengeCategories = [
  { id: 1, name: '전체' },
  { id: 2, name: '건강' },
  { id: 3, name: '생산성' },
  { id: 4, name: '창의성' },
  { id: 5, name: '학습' },
];

const filterOptions = {
  기간: ['전체', '30일', '7일'],
  난이도: ['전체', '하', '중', '상'],
  정렬: ['인기순', '최신순'],
};

const Challenge = () => {
  const [activeCategory, setActiveCategory] = React.useState(1);
  const [filters, setFilters] = React.useState({
    기간: '전체',
    난이도: '전체',
    정렬: '인기순',
  });
  const [activeFilterKey, setActiveFilterKey] = React.useState<
    null | keyof typeof filters
  >(null);

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

  return (
    <div className="flex flex-col w-full h-full text-gray-black">
      {/* Header */}
      <header className="flex items-center justify-between w-full py-[0.59rem] h-11 px-7">
        <div className="text-h3">챌린지</div>
        <div className="flex items-center gap-2">
          <MagnifyingGlassIcon />
          <PlusIcon />
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex justify-between px-6 mt-4 border-b border-gray-100">
        {challengeCategories.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-center w-16 text-he pb-[0.44rem] ${
              item.id === activeCategory
                ? 'border-b-2 border-gray-black'
                : 'text-gray-400 pb-[0.56rem]'
            }`}
            onClick={() => setActiveCategory(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-6 py-2 mt-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
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
            {key === '정렬'
              ? value
              : `${key} ${value === '전체' || value === '인기순' ? '' : value}`}
            <UnderArrowIcon />
          </div>
        ))}
      </div>

      {/* Bottom Sheet */}
      <FilterModal
        isOpen={!!activeFilterKey}
        onClose={() => setActiveFilterKey(null)}
        title={`${activeFilterKey ?? ''} 선택`}
        options={activeFilterKey ? filterOptions[activeFilterKey] : []}
        selectedOption={activeFilterKey ? filters[activeFilterKey] : ''}
        onSelect={(option) =>
          activeFilterKey && updateFilter(activeFilterKey, option)
        }
      />

      {/* Challenge List */}
      <div className="flex-1 h-0 min-h-0 px-6 pb-16 mt-2 overflow-y-scroll scrollbar-hide -webkit-overflow-scrolling-touch overscroll-contain">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          {ChallengeData.challenges.map((item) => (
            <ChallengeContent
              key={item.id}
              count={item.activePeopleCount}
              title={item.title}
              imgUrl={item.imgUrl}
              difficulty={item.difficulty}
              createrName={item.createrName}
              createrImgUrl={item.createrImgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
