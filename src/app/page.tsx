'use client';

import TextLogo from '@/components/shared/TextLogo';
import {
  PointIcon,
  MagnifyingGlassIcon,
  SearchBarCancelIcon,
} from '@public/icons/Home';
import React from 'react';

const Home = () => {
  const [isSearchbarFocus, setIsSearchbarFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className="w-full h-[100vh] pr-6 pl-6">
      <header className="flex items-center justify-between w-full h-11 pr-[0.31rem] pl-[0.31rem]">
        <TextLogo width={75} />
        <PointIcon />
      </header>
      <div className="flex items-center justify-between w-full h-12 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center w-full gap-2">
          <MagnifyingGlassIcon isFocus={isSearchbarFocus} />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
            className="w-full placeholder-gray-300 outline-none caret-black caret-w-[1.5rem] bg-gray-50 mr-2"
            onFocus={() => setIsSearchbarFocus(true)}
            onBlur={() => setIsSearchbarFocus(false)}
          />
        </div>
        {isSearchbarFocus ? (
          <div className="flex items-center justify-between">
            <SearchBarCancelIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
