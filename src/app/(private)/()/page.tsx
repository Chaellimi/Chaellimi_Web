'use client';

import { PointIcon } from '@public/icons/Home';
import Image from 'next/image';
import React, { useState } from 'react';
import Banner from '@public/images/HomeBanner.png';
import ActiveChallenge from '@/components/Home/ActiveChallenge';
import HotChallenge from '@/components/Home/HotChallenge';
import Header from '@/components/shared/Header';
import { ArrowIcon } from '@public/icons/shared';
import {
  useGetParticipatingChallenge,
  useGetPopularChallenge,
} from '@/service/Challenge/challenge.query';
import Loading from '@/components/shared/Loading';
import { useRouter } from 'next/navigation';

interface ParticipatingChallenge {
  challengeId: number;
  joinedAt: string;
  streak: string;
  status: string;
  challenge: {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    day: number;
    imgURL: string;
  };
  achievementRate: number;
  isCertifiedToday: boolean;
}

export interface ChallengeWithParticipantCount {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
  day: number;
  imgURL: string;
  participantCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const Home = () => {
  const router = useRouter();

  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {
    data: ParticipatingChallengeData,
    isPending: getParticipatingChallengePending,
  } = useGetParticipatingChallenge();
  const { data: PopularChallengeData, isPending: getPopularChallengePending } =
    useGetPopularChallenge(3);

  function getCertificationProgress() {
    const total = ParticipatingChallengeData?.data?.length;
    const certifiedCount = ParticipatingChallengeData?.data.filter(
      (item: ParticipatingChallenge) => item.isCertifiedToday
    ).length;

    return `${certifiedCount}/${total}`;
  }

  function getCompletedChallengeCount() {
    return ParticipatingChallengeData?.data.filter(
      (item: ParticipatingChallenge) => item.achievementRate >= 100
    ).length;
  }

  if (getParticipatingChallengePending || getPopularChallengePending) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full cursor-pointer">
      <Header type="logo" icon={<PointIcon />} iconClick="/point" />

      <div
        className="flex-1 flex flex-col gap-2 px-6 mt-2 pb-[5rem] overflow-y-scroll scrollbar-hide overscroll-contain"
        style={{ height: 'calc(100% - 3rem)' }}
      >
        {/* Search Bar */}
        <Header
          type="searchNoBack"
          searchText={searchText}
          setSearchText={setSearchText}
          isSearchbarVisible={isSearchbarVisible}
          setIsSearchbarVisiable={setIsSearchbarVisible}
        />

        {/* Main Content */}
        <div>
          <Image src={Banner} width={413} alt="" className="mt-[0.88rem]" />
        </div>

        {/* Active Challenge */}
        {ParticipatingChallengeData?.data.length != 0 ? (
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex items-center justify-between">
              <div className="text-he">참여중인 챌린지</div>
              <div className="text-gray-300 text-fn">
                {getCertificationProgress()} 완료
              </div>
            </div>

            <div className="flex w-full overflow-scroll gap-[0.62rem] scrollbar-hide">
              {ParticipatingChallengeData?.data.map(
                (item: ParticipatingChallenge) => {
                  if (item.achievementRate >= 100) {
                    return '';
                  } else {
                    return (
                      <ActiveChallenge
                        key={item.challengeId}
                        isActive={
                          item.isCertifiedToday || item.achievementRate >= 100
                        }
                        progress={item.achievementRate}
                        title={item.challenge.title}
                        time={'고정값'}
                        imgURL={item.challenge.imgURL}
                        certificationLink={`/challenge/${item.challengeId}/certification`}
                        progressLink={`/challenge/${item.challengeId}/progress`}
                      />
                    );
                  }
                }
              )}
            </div>
          </div>
        ) : null}

        {/* Complete Challenge */}
        {ParticipatingChallengeData?.data.length != 0 &&
        ParticipatingChallengeData?.data.some(
          (item: ParticipatingChallenge) => item.achievementRate === 100
        ) ? (
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex items-center justify-between">
              <div className="text-he">완료한 챌린지</div>
              <div className="text-gray-300 text-fn">
                총 {getCompletedChallengeCount()}개 완료
              </div>
            </div>

            <div className="flex w-full overflow-scroll gap-[0.62rem] scrollbar-hide">
              {ParticipatingChallengeData?.data.map(
                (item: ParticipatingChallenge) => {
                  if (item.achievementRate >= 100) {
                    return (
                      <ActiveChallenge
                        key={item.challengeId}
                        isActive={
                          item.isCertifiedToday || item.achievementRate >= 100
                        }
                        title={item.challenge.title}
                        time={'고정값'}
                        imgURL={item.challenge.imgURL}
                        certificationLink={`/challenge/${item.challengeId}/certification`}
                        progressLink={`/challenge/${item.challengeId}/progress`}
                      />
                    );
                  } else {
                    return '';
                  }
                }
              )}
            </div>
          </div>
        ) : null}

        {/* Hot Challenge */}
        <div className="flex flex-col gap-2 mt-5">
          <div
            className="flex items-center justify-between"
            onClick={() => {
              router.push('/challenge');
            }}
          >
            <div className="text-he">요즘 뜨는 챌린지</div>
            <ArrowIcon width="24" height="24" location="right" />
          </div>
          <div className="flex overflow-scroll gap-[0.62rem] scrollbar-hide">
            {PopularChallengeData?.data.map(
              (item: ChallengeWithParticipantCount) => (
                <HotChallenge
                  key={item.id}
                  count={item.participantCount}
                  title={item.title}
                  imgUrl={item.imgURL}
                  link={`/challenge/${item.id}?back=/`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
