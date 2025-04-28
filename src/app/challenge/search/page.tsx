'use client';

import Header from '@/components/shared/Header';
import React from 'react';

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
      <div></div>
    </div>
  );
};

export default ChallengeSearch;
