'use client';

import React from 'react';
import Header from '@/components/shared/Header';
import { CoinIcon, InfoIcon } from '@public/icons/Challenge/progress';
import { useParams } from 'next/navigation';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import { useGetChallengeProgressLog } from '@/service/Challenge/challenge.query';
import Loading from '@/components/shared/Loading';

const ALL = () => {
  const { id } = useParams();

  useStatusBarBridge({
    backgroundColor: '#FFF0E5',
    translucent: true,
    bottomBackgroundColor: '#FFF0E5',
  });

  const { data: data, isLoading } = useGetChallengeProgressLog(id as string);
  const progressLog = data?.data;

  const getChallengeDates = (joinedAt: string, totalDay: number): string[] => {
    const start = new Date(joinedAt);
    return Array.from({ length: totalDay }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().split('T')[0];
    });
  };

  const challengeDates = getChallengeDates(
    progressLog.joinedAt,
    progressLog.totalDay
  );
  const certifiedSet = new Set(progressLog.certifiedDays || []);

  const today = new Date();
  today.setHours(23, 59, 59, 59);

  if (isLoading || !progressLog) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full pb-4 overflow-y-auto bg-primary-light gap-[0.62rem]">
      <Header
        type="default"
        title="진행사항"
        icon={<InfoIcon />}
        backClick={`/challenge/${id}/progress`}
      />

      <div className="flex flex-col gap-[0.62rem] w-full items-center px-6">
        <div className="w-full px-[0.62rem] py-5 bg-gray-white rounded-[1.25rem]">
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center">
            {challengeDates.map((dateStr, index) => {
              const thisDate = new Date(dateStr);
              const isPassed = thisDate <= today;
              const isCertified = certifiedSet.has(dateStr);

              return isPassed ? (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between gap-2"
                >
                  <div
                    className={`w-fit h-fit p-[0.45rem] rounded-full ${
                      isCertified ? 'bg-primary-light' : 'bg-gray-100'
                    }`}
                  >
                    <CoinIcon disabled={!isCertified} />
                  </div>
                  <div className="text-gray-500 text-c1">{index + 1}일차</div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALL;
