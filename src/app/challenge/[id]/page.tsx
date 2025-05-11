'use client';

import ActionSheet from '@/components/shared/ActionSheet';
import Header from '@/components/shared/Header';
import { MoreVerticalDotIcon } from '@public/icons/Challenge/id';
import {
  ArrowIcon,
  BookmarkIcon,
  EditIcon,
  FireIcon,
  ShareIcon,
  TrashIcon,
} from '@public/icons/shared';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const ChallengeSingle = () => {
  const difficulty = 'Hard';
  const { id } = useParams();
  console.log(id);
  const imgUrl =
    'https://img.freepik.com/free-photo/man-jump-through-gap-hill-man-jumping-cliff-blue-sky-business-concept-idea_1323-185.jpg?semt=ais_hybrid&w=740';

  const [actionSheet, setActionSheet] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  return (
    <div className="relative flex flex-col w-full h-full text-gray-black">
      {actionSheet && (
        <div
          className="absolute z-10 w-full h-full"
          onClick={() => {
            setActionSheet(false);
          }}
        />
      )}
      <Header type="default" title="챌린지 상세" backClick="/challenge" />

      <div className="flex flex-col w-full h-full overflow-y-scroll">
        {/* Main Image */}
        <div className="relative w-full h-[12.5rem] ">
          <Image
            src={imgUrl}
            alt=""
            width={200}
            height={200}
            className="object-cover object-top w-full h-full"
          />
        </div>

        {/* Challenge Info */}
        <div className="flex flex-col w-full pt-[1.88rem]">
          {/* Info */}
          <div className="flex flex-col w-full px-6 gap-[0.31rem] relative">
            <div className="flex items-center justify-between w-full gap-1">
              <div className="flex items-center gap-1">
                <div
                  className={`text-center text-c2 px-[0.38rem] py-[0.15rem] rounded-[0.25rem] w-16
                ${
                  difficulty === 'Hard'
                    ? 'bg-red-100 text-red-200'
                    : difficulty === 'Medium'
                      ? 'bg-primary-light text-primary-default'
                      : 'bg-green-100 text-green-200'
                }
                `}
                >
                  {difficulty === 'Hard'
                    ? '난이도 상'
                    : difficulty === 'Medium'
                      ? '난이도 중'
                      : '난이도 하'}
                </div>
                <div className="text-center text-c2 first-line px-[0.38rem] py-[0.15rem] bg-gray-50 rounded-[0.25rem] w-16 text-gray-500">
                  30일 도전
                </div>
              </div>
              <div
                className="absolute z-20 w-6 h-6 right-6"
                onClick={() => {
                  setActionSheet(!actionSheet);
                }}
              >
                <MoreVerticalDotIcon />
              </div>

              {actionSheet && (
                <div className="absolute z-10 right-6 top-6">
                  <ActionSheet
                    buttons={[
                      {
                        icons: <ShareIcon />,
                        text: '공유',
                        onClick: () => {},
                      },
                      {
                        icons: <EditIcon />,
                        text: '수정',
                        onClick: () => {},
                      },
                      {
                        icons: <TrashIcon />,
                        text: '삭제',
                        textColor: 'red-200',
                        onClick: () => {},
                      },
                    ]}
                  />
                </div>
              )}
            </div>

            <div className="text-h2">하루 물 2리터 마시기</div>

            <div className="flex items-center gap-1 text-gray-500 text-c1">
              <div>건강</div>
              <div>·</div>
              <div>12시간전</div>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col w-full px-6 gap-[0.622rem] mt-6">
            <div className="flex items-center gap-1">
              <FireIcon />
              <div className="text-gray-500 text-b3">300명 도전중</div>
            </div>

            <div className="text-h3">챌린지 소개</div>

            <div className="text-b2">
              챌린리 설명입니다. 하루에 물을2La마시는것은 절맣 좋은
              행동입니다챌린리 설명입니다. 하루에 물을2La마시는것은 절맣 좋은
              행동입니다챌린리 설명입니다. 하루에 물을2La마시는것은 절맣 좋은
              행동입니다챌린리 설명입니다. 하루에 물을2La마시는것은 절맣 좋은
              행동입니다챌린리 설명입니다. 하루에 물을2La마시는것은 절맣 좋은
              행동입니다
            </div>
          </div>
        </div>

        {/* Provider */}
        <div className="w-full my-4 min-h-1 bg-gray-50" />

        {/* Profile */}
        <div className="flex items-center justify-between w-full px-6">
          <div className="flex items-center gap-[0.62rem]">
            <div className="relative rounded-full w-9 h-9">
              <Image
                src={imgUrl}
                alt=""
                width={36}
                height={36}
                className="object-cover object-top w-full h-full rounded-full"
              />
            </div>
            <div>
              <div className="text-b3">UserName</div>
              <div className="text-c1">챌린지 개설 2개</div>
            </div>
          </div>
          <div>
            <ArrowIcon location="right" />
          </div>
        </div>

        {/* Provider */}
        <div className="w-full my-4 min-h-1 bg-gray-50" />

        <div className="flex flex-col px-6 gap-[0.63rem]">
          <div className="text-he">이런 챌린지는 어때요?</div>

          <div className="grid grid-cols-3 gap-x-5 gap-y-5">
            <div className="flex flex-col gap-[0.63rem]">
              <div
                className="aspect-square rounded-xl w-[6.25rem] h-[6.25rem]"
                style={{
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col justify-between h-full w-full px-[0.66rem] py-2">
                  <div className="flex justify-end w-full">
                    <BookmarkIcon width="19" height="18" />
                  </div>
                </div>
              </div>
              <div className="text-fn">하루 물 2L 마시기</div>
            </div>
          </div>

          <button className="flex items-center justify-center w-full text-gray-500 text-bn3 h-11 rounded-xl bg-gray-50">
            다른 챌린지 더 보기
          </button>
        </div>

        <div className="w-full px-6 bg-gray-50 py-[0.62rem] mt-[1.88rem]">
          <span className="text-gray-400 text-fn">
            주의사항 <br />
          </span>
          <span className="text-gray-400 text-c1">
            1. 인증은 하루 1회만 가능합니다. <br />
            2. 중간에 챌린지를 포기하면 연속 달성일 수가 초기화됩니다. <br />
            3. 챌린지 종료 후 목표를 완료하지 못하면 다시 시작할 수 없습니다.
          </span>
          <br />
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50">
        <div onClick={() => setIsBookmarked(!isBookmarked)}>
          <BookmarkIcon
            width="24"
            height="24"
            stroke="black"
            isChecked={isBookmarked}
          />
        </div>
        <div className="h-7 w-[0.0625rem] bg-gray-200" />
        <button
          className="flex items-center justify-center w-full h-[3.25rem] bg-primary-default rounded-xl text-bn1 text-gray-white 
        "
        >
          참여하기
        </button>
      </div>
    </div>
  );
};

export default ChallengeSingle;
