import { FireIcon } from '@public/icons/shared';
import Image from 'next/image';
import React from 'react';

interface OwnProps {
  count: number;
  title: string;
  imgUrl: string;
}

const HotChallenge = ({ imgUrl, title, count }: OwnProps) => {
  return (
    <div className="flex flex-col gap-[0.62rem]">
      <div className="w-[9.38rem] h-[9.38rem] relative">
        <Image
          src={imgUrl}
          width={150}
          height={150}
          alt=""
          className="object-cover object-top w-full h-full rounded-xl"
        />
      </div>
      <div>
        <div className="text-b2">{title}</div>
        <div className="flex items-center gap-1 text-gray-500 text-b3">
          <FireIcon />
          {count}명 도전 중
        </div>
      </div>
    </div>
  );
};

export default HotChallenge;
