'use client';

import React, { useEffect, useState } from 'react';
import ChallengeContent from '@/components/Challenge/ChallengeContent';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { usePostBookmarkUpdate } from '@/service/shared/shared.mutation';
import { useGetBookmarkList } from '@/service/shared/shared.query';

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
  const bookmarkList = React.useMemo(() => data?.data ?? [], [data]);

  const { mutate } = usePostBookmarkUpdate();

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (bookmarkList.length > 0) {
      const initialChecked = Object.fromEntries(
        bookmarkList.map((item: BookmarkType) => [item.id, true])
      );
      setCheckedItems(initialChecked);
    }
  }, [bookmarkList]);

  if (isLoading) {
    return <Loading />;
  }

  const handleBookmarkClick = (challengeId: number, bookmarkId: number) => {
    mutate(challengeId);
    setCheckedItems((prev) => ({
      ...prev,
      [bookmarkId]: false,
    }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header type="default" title="저장됨" backClick="/profile" />

      <div className="flex-1 px-4 pb-16 mt-2 overflow-y-scroll scrollbar-hide -webkit-overflow-scrolling-touch overscroll-contain">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          {bookmarkList.length > 0 ? (
            bookmarkList.map(
              (item: BookmarkType) =>
                checkedItems[item.id] && (
                  <ChallengeContent
                    key={item.id}
                    id={item.id}
                    title={item.challenge.title}
                    imgUrl={item.challenge.imgURL}
                    days={Number(item.challenge.day)}
                    count={item.challenge.participantCount}
                    difficulty={item.challenge.difficulty}
                    createrName={item.challenge.User.name}
                    createrImgUrl={item.challenge.User.profileImg}
                    isChecked={true}
                    onClickBookmark={() =>
                      handleBookmarkClick(item.challengeId, item.id)
                    }
                    link={`/challenge/${item.challenge.id}?back=/profile/bookmark`}
                  />
                )
            )
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              저장된 챌린지가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
