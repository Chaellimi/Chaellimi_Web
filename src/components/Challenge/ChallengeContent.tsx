import { BookmarkIcon, FireIcon } from '@public/icons/shared';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface OwnProps {
  id: number;
  count: number;
  title: string;
  imgUrl: string;
  difficulty: 'hard' | 'normal' | 'easy';
  createrName: string;
  createrImgUrl: string;
  days: number;
}

const ChallengeContent = ({
  id,
  imgUrl,
  title,
  count,
  difficulty,
  createrName,
  createrImgUrl,
  days,
}: OwnProps) => {
  return (
    <Link href={`/challenge/${id}`}>
      <div className="flex flex-col gap-1">
        <div
          className="w-full aspect-square rounded-xl"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col justify-between h-full w-full px-[0.66rem] py-2">
            <button
              className="flex justify-end w-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <BookmarkIcon />
            </button>

            <div className="flex items-center justify-between w-full">
              <div
                className={`text-center text-c2 px-[0.38rem] py-[0.15rem] rounded-[0.25rem] w-16
                ${
                  difficulty === 'hard'
                    ? 'bg-red-100 text-red-200'
                    : difficulty === 'normal'
                      ? 'bg-primary-light text-primary-default'
                      : 'bg-green-100 text-green-200'
                }
                `}
              >
                {difficulty === 'hard'
                  ? '난이도 상'
                  : difficulty === 'normal'
                    ? '난이도 중'
                    : '난이도 하'}
              </div>
              <div className="text-center text-c2 first-line px-[0.38rem] py-[0.15rem] bg-gray-50 rounded-[0.25rem] w-16 text-gray-500">
                {days}일 도전
              </div>
            </div>
          </div>
        </div>

        <div className="text-b2">{title}</div>
        <div className="flex items-center gap-1 text-gray-500 text-b3">
          <FireIcon />
          {count}명 도전 중
        </div>

        <div className="flex items-center gap-[0.31rem]">
          <div className="relative rounded-full w-7 h-7">
            <Image
              src={createrImgUrl}
              alt={createrName}
              width={28}
              height={28}
              className="object-cover object-top w-full h-full rounded-full"
            />
          </div>
          <div>{createrName}</div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeContent;
