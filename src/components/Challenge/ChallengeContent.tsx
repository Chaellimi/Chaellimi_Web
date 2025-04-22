import { BookmarkIcon } from '@public/icons/Challenge';
import { FireIcon } from '@public/icons/Home';
import Image from 'next/image';
import React from 'react';

interface OwnProps {
  count: number;
  title: string;
  imgUrl: string;
  difficulty: string;
  createrName: string;
  createrImgUrl: string;
}

const Challenge = ({
  imgUrl,
  title,
  count,
  difficulty,
  createrName,
  createrImgUrl,
}: OwnProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full aspect-square">
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover object-top rounded-xl"
        />
        <div className="absolute top-2 right-2">
          <BookmarkIcon />
        </div>
      </div>

      {difficulty === 'Hard' ? (
        <div className="text-c2 px-[0.38rem] py-[0.15rem] bg-red-100 rounded-[0.25rem] w-fit text-red-200">
          난이도 상
        </div>
      ) : difficulty === 'Medium' ? (
        <div className="text-c2 px-[0.38rem] py-[0.15rem] bg-primary-light w-fit text-primary-default">
          난이도 중
        </div>
      ) : (
        <div className="text-c2 px-[0.38rem] py-[0.15rem] bg-green-100 w-fit text-green-200">
          난이도 하
        </div>
      )}
      <div className="text-b2">{title}</div>
      <div className="flex items-center gap-1 text-gray-500 text-b3">
        <FireIcon />
        {count}명 도전 중
      </div>

      <div className="flex items-center gap-[0.31rem]">
        <div className="relative rounded-full w-9 h-9">
          <Image
            src={createrImgUrl}
            alt={createrName}
            width={36}
            height={36}
            className="object-cover object-top w-full h-full rounded-full"
          />
        </div>
        <div>{createrName}</div>
      </div>
    </div>
  );
};

export default Challenge;
