'use client';

import React, { useCallback } from 'react';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import Header from '@/components/shared/Header';
import { CoinIcon, InfoIcon } from '@public/icons/Challenge/progress';
import { ArrowIcon } from '@public/icons/shared';
import BottomButton from '@/components/shared/BottomButton';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGetChallengeProgressLog } from '@/service/Challenge/challenge.query';
import { progressUtil } from '@/lib/utils/progressUtil';
import ProgressHand from '@public/images/ProgressHand.png';
import Image from 'next/image';
import { formatDateToDot } from '@/lib/utils/formatDateToDot';
import Loading from '@/components/shared/Loading';
import dayjs from 'dayjs';

interface pointSavingLogType {
  id: number;
  type: string;
  amount: number;
  description: string;
  balance_after: string;
  createdAt: string;
}

const Progress = () => {
  const router = useRouter();
  const { id } = useParams();
  const backPath = useSearchParams().get('back');

  useStatusBarBridge({
    backgroundColor: '#FFF0E5',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  const { data: data, isLoading } = useGetChallengeProgressLog(id as string);
  const progressLog = data?.data;

  // 챌린지 진행률 계산
  const { joinedDate, endDate } = progressUtil.formatJoinedAndEndDate(
    progressLog?.joinedAt,
    progressLog?.totalDay
  );
  const progressRate = progressUtil.getDateProgressRate(
    progressLog?.joinedAt,
    progressLog?.totalDay
  );

  // 코인 표기하는 날짜 계산
  const getChallengeDates = useCallback(
    (joinedAt: string, totalDay: number): string[] => {
      const startDate = new Date(joinedAt);
      return Array.from({ length: totalDay }).map((_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date.toISOString().split('T')[0];
      });
    },
    []
  );

  const progressDates = getChallengeDates(
    progressLog?.joinedAt,
    progressLog?.totalDay
  ).slice(0, 6);
  const certifiedSet = new Set(progressLog?.certifiedDays || []);

  const today = dayjs().format('YYYY-MM-DD');
  const todayCertified =
    progressLog?.certifiedDays.includes(today) ||
    progressUtil.isChallengeExpired(
      progressLog?.joinedAt,
      progressLog?.totalDay
    );

  if (isLoading || !progressLog) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full custom601:mt-[-40px]">
      <div className="bg-primary-light custom601:pt-[40px] min-h-fit">
        <Header
          type="default"
          title="진행사항"
          icon={<InfoIcon />}
          backClick={backPath ? backPath : '/'}
        />
      </div>

      <div className="h-full overflow-y-scroll">
        <div className="flex flex-col w-full gap-5 px-6 bg-primary-light pt-[0.62rem]">
          <div>
            <div className="text-gray-600 text-b3">
              챌린지 진행{' '}
              {progressUtil.isChallengeExpired(
                progressLog?.joinedAt,
                progressLog?.totalDay
              )
                ? ' 완료!'
                : progressUtil.getChallengeProgressDay(progressLog?.joinedAt) +
                  '일차'}
            </div>
            <div className="text-gray-black text-h1">{progressLog?.title}</div>
          </div>

          <div className="flex flex-col gap-[0.62rem] w-full">
            <div className="relative flex w-full h-[8px] bg-white rounded-full">
              <div
                className={`absolute top-0 bottom-0 rounded-full bg-primary-default`}
                style={{ width: `${progressRate || 0}%` }}
              />
              <div
                className={`absolute w-[30px] h-[30px] top-[-12px]`}
                style={{ left: `${Math.max(0, (progressRate || 0) - 5)}%` }}
              >
                <Image
                  src={ProgressHand}
                  width={30}
                  height={30}
                  alt=""
                  className="object-cover object-top w-full h-full"
                />
              </div>
            </div>

            <div className="flex justify-between text-gray-400 text-c2">
              <span>{joinedDate}</span>
              <span>{endDate}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[0.62rem] w-full items-center pb-5">
            <div className="flex flex-col gap-[0.62rem] w-full items-center">
              <div className="w-full px-[0.62rem] py-5 bg-gray-white rounded-[1.25rem]">
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center">
                  {progressDates.map((dateStr, index) => {
                    const today = dayjs().format('YYYY-MM-DD');
                    const isFeature = new Date(dateStr) <= new Date(today);
                    const isCertified = certifiedSet.has(dateStr);

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-between gap-2"
                      >
                        {isFeature ? (
                          isCertified ? (
                            <div className="w-fit h-fit p-[0.45rem] rounded-full bg-primary-light shadow-Coin-Primary">
                              <CoinIcon disabled={false} />
                            </div>
                          ) : (
                            <div className="w-fit h-fit p-[0.45rem] rounded-full bg-gray-100 shadow-Coin-Gray">
                              <CoinIcon disabled={true} />
                            </div>
                          )
                        ) : (
                          <div className="w-[44px] h-[44px]" />
                        )}

                        {isFeature && (
                          <div className="text-gray-500 text-c1">
                            {index + 1}일차
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              className="flex items-center justify-center rounded-[1.25rem] bg-gray-white w-fit px-4 py-[0.62rem] text-bn3 text-gray-600"
              onClick={() => {
                router.push(`/challenge/${id}/all`);
              }}
            >
              전체보기
              <ArrowIcon
                location="right"
                width="17"
                height="16"
                fill="#5C5C5C"
              />
            </button>
          </div>
        </div>

        <div className="w-full px-6 py-5 bg-white">
          <div className="text-gray-black text-b2">적립내역</div>

          {progressLog?.pointSavingLog.length === 0 ? (
            <div> 이건 뜨면 안됨... </div>
          ) : (
            <div className="flex flex-col">
              {progressLog?.pointSavingLog.map((item: pointSavingLogType) => (
                <div
                  className="flex items-center justify-between w-full py-5 border-b border-gray-50"
                  key={item.id}
                >
                  <div className="flex items-center gap-[0.88rem]">
                    <div className="text-gray-400 text-fn">
                      {formatDateToDot(item.createdAt)}
                    </div>
                    <div className="text-gray-black text-b3">
                      {item.description}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center gap-2">
                    <div
                      className={`text-bn2 ${
                        item.type === 'deposit'
                          ? 'text-primary-default'
                          : 'text-gray-black'
                      }`}
                    >
                      {item.type === 'deposit' ? '+' : '-'}
                      {Number(item.amount).toLocaleString()}P
                    </div>
                    <div className="text-gray-400 text-c1">
                      {Number(item.balance_after).toLocaleString()}P
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {todayCertified ? null : (
        <div className="bottom-0 flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50">
          <BottomButton
            title="인증하러 가기"
            onClick={() => {
              router.push(
                `/challenge/${id}/certification?back=/challenge/${id}/progress`
              );
            }}
            disabled="false"
          />
        </div>
      )}
    </div>
  );
};

export default Progress;
