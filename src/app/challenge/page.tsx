import { MagnifyingGlassIcon, PlusIcon } from '@public/icons/Challenge';
import React from 'react';

const Challenge = () => {
  return (
    <div className="w-full h-full pl-8 pr-8 text-gray-black">
      <header className="flex items-center justify-between w-full h-11 pr-[0.31rem] pl-[0.31rem]">
        <div className="text-h3">챌린지</div>
        <div className="flex items-center gap-[0.62rem]">
          <MagnifyingGlassIcon />
          <PlusIcon />
        </div>
      </header>
    </div>
  );
};

export default Challenge;
