'use client';

import React, { useState } from 'react';
import Header from '@/components/shared/Header';
import { PointIcon } from '@public/icons/Challenge/point';
import { useGetPoint, useGetPointDetail } from '@/service/Point/point.query';
// import { PointDetailType } from '@/types/Point';

const PointCategory = [
  { id: 1, name: '전체' },
  { id: 2, name: '사용' },
  { id: 5, name: '획득' },
];

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

export const formatDateToYMD = (isoString: string): string => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const Point = () => {
  const [activeCategory, setActiveCategory] = useState(1);

  const { data: totalPoint } = useGetPoint();
  const { data: pointDetail } = useGetPointDetail();
  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header type="default" backClick="/" title="포인트" />

      <div className="w-full px-6">
        <div className="flex flex-col w-full gap-1 p-6 bg-gray-50 rounded-xl mt-[0.62rem]">
          <div className="text-b3">보유 포인트</div>
          <div className="flex items-center gap-4 text-Lg">
            <PointIcon />
            {totalPoint?.data?.totalPoint}P
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-6 mt-5">
        <div className="flex items-center justify-between w-full h-8">
          <div className="flex items-center h-full text-b2">적립내역</div>
          <div className="flex h-full gap-2">
            {PointCategory.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-center h-full px-[0.62rem] text-bn3 rounded-lg 
                  ${
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

        <div className="flex flex-col w-full overflow-y-scroll h-[calc(100vh-16rem)] scrollbar-hide">
          {pointDetail?.data?.map((item: PointResponseType) => (
            <div
              className="flex items-center justify-between w-full py-5"
              key={item.id}
            >
              <div className="flex items-center gap-[0.88rem]">
                <div className="text-gray-400 text-fn">
                  {formatDateToYMD(item.createdAt)}
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
                  {item.type == 'deposit' ? '+' : '-'}
                  {item.amount.toLocaleString()}P
                </div>
                <div className="text-gray-400 text-c1">
                  {item.balance_after.toLocaleString()}P
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Point;
