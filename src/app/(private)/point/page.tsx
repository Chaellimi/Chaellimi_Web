'use client';

import React, { useState } from 'react';
import Header from '@/components/shared/Header';
import { PointIcon } from '@public/icons/Challenge/point';
import { useGetPoint, useGetPointDetail } from '@/service/Point/point.query';
import { PointDetailType } from '@/types/Point';
import Loading from '@/components/shared/Loading';
import { formatDateToDot } from '@/lib/utils/formatDateToDot';

const PointCategory = [
  { id: 1, name: '전체', type: '' },
  { id: 2, name: '사용', type: 'withdrawal' },
  { id: 3, name: '획득', type: 'deposit' },
] as const;

interface PointResponseType {
  id: number;
  userId: number;
  type: 'withdrawal' | 'deposit';
  amount: string;
  balance_after: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const Point = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);

  const activeType =
    PointCategory.find((item) => item.id === activeCategory)?.type ?? '';

  const { data: totalPoint, isLoading: getPointLoading } = useGetPoint();
  const { data: pointDetail, isLoading: getPointDetailLoading } =
    useGetPointDetail(
      activeType === '' ? undefined : (activeType as PointDetailType)
    );

  if (getPointLoading || getPointDetailLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header type="default" backClick="/" title="포인트" />

      {/* 보유 포인트 */}
      <div className="w-full px-6">
        <div className="flex flex-col w-full gap-1 p-6 bg-gray-50 rounded-xl mt-[0.62rem]">
          <div className="text-b3">보유 포인트</div>
          <div className="flex items-center gap-4 text-Lg">
            <PointIcon />
            {totalPoint?.data?.totalPoint.toLocaleString()}P
          </div>
        </div>
      </div>

      {/* 필터 카테고리 */}
      <div className="flex flex-col w-full h-full gap-3 px-6 mt-5">
        <div className="flex items-center justify-between w-full h-8">
          <div className="flex items-center h-full text-b2">적립내역</div>
          <div className="flex h-full gap-2">
            {PointCategory.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-center h-full px-[0.62rem] text-bn3 rounded-lg cursor-pointer ${
                  item.id === activeCategory
                    ? 'bg-primary-default text-gray-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveCategory(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col w-full h-full overflow-scroll scrollbar-hide custom601:h-[70%]">
          {pointDetail?.data?.map((item: PointResponseType) => (
            <div
              className="flex items-center justify-between w-full py-5 border-b border-gray-100"
              key={item.id}
            >
              <div className="flex items-center gap-[0.88rem]">
                <div className="text-gray-400 text-fn">
                  {formatDateToDot(item.createdAt)}
                </div>
                <div className="text-b3">{item.description}</div>
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

          {pointDetail?.data?.length === 0 && (
            <div className="flex justify-center w-full py-10 text-gray-400 text-b3">
              내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Point;
