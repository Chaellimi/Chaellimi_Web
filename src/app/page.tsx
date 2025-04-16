import TextLogo from '@/components/shared/TextLogo';
import PointIcon from '@public/icons/Point';
import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <header className="flex items-center justify-between w-full h-11 pr-7 pl-7">
        <TextLogo width={75} />
        <PointIcon />
      </header>
    </div>
  );
};

export default Home;
