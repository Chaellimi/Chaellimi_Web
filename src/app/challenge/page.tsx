'use client';

import { MagnifyingGlassIcon, PlusIcon } from '@public/icons/Challenge';
import React from 'react';

const challengeCategories = [
  { id: 1, name: '전체' },
  { id: 2, name: '건강' },
  { id: 3, name: '생산성' },
  { id: 4, name: '창의성' },
  { id: 5, name: '학습' },
];

const Challenge = () => {
  const [activeCategory, setActiveCategory] = React.useState(1);

  return (
    <div className="w-full h-full text-gray-black">
      <header className="flex items-center justify-between w-full h-11 pr-[1.75rem] pl-[1.75rem] pb-2 pt-2">
        <div className="text-h3">챌린지</div>
        <div className="flex items-center gap-[0.62rem]">
          <MagnifyingGlassIcon />
          <PlusIcon />
        </div>
      </header>

      <div className="flex flex-row items-center justify-between w-full pl-6 pr-6 border-b border-gray-100">
        {challengeCategories.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-center w-16 text-he pb-[0.44rem] ${item.id === activeCategory ? 'border-b-2 border-gray-black' : 'pb-[0.56rem]'}`}
            onClick={() => setActiveCategory(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenge;
