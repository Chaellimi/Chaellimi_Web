'use client';

import ChallengeContent from '@/components/Challenge/ChallengeContent';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useGetBookmarkList } from '@/service/shared/shared.query';
import React from 'react';

interface BookmarkType {
  id: number;
  challengeId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  challenge: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'normal' | 'hard';
    day: number;
    imgURL: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    participantCount: number;
    User: {
      userId: number;
      name: string;
      profileImg: string;
    };
  };
}

const Bookmark = () => {
  const { data, isLoading } = useGetBookmarkList();
  const bookmarkList = data?.data;
  console.log(bookmarkList);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header type="default" title="저장됨" />

      {bookmarkList?.length > 0 ? (
        bookmarkList?.map((item: BookmarkType) => (
          <div
            className="flex-1 px-8 pb-16 mt-2 overflow-y-scroll scrollbar-hide -webkit-overflow-scrolling-touch overscroll-contain"
            key={item.id}
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              <ChallengeContent
                id={item.id}
                title={item.challenge.title}
                imgUrl={item.challenge.imgURL}
                days={Number(item.challenge.day)}
                count={item.challenge.participantCount}
                difficulty={item.challenge.difficulty}
                createrName={item.challenge.User.name}
                createrImgUrl={item.challenge.User.profileImg}
                isChecked={true}
                onClickBookmark={() => {}}
                link={`/challenge/${item.challenge.id}?back=/profile/bookmark`}
              />
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Bookmark;
