'use client';

import React, { useState } from 'react';
import Header from '@/components/shared/Header';
import { PointIcon } from '@public/icons/Challenge/point';
import PointData from '@/data/Point/data.json';
import { useGetPoint } from '@/service/Point/point.query';

const PointCategory = [
  { id: 1, name: '전체' },
  { id: 2, name: '사용' },
  { id: 5, name: '획득' },
];

const Point = () => {
  const [activeCategory, setActiveCategory] = useState(1);

  const { data: totalPoint } = useGetPoint();

  const filteredPoints = PointData.Point.filter((item) => {
    if (activeCategory === 2) return item.point < 0;
    if (activeCategory === 5) return item.point > 0;
    return true;
  });

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

        <div>
          {filteredPoints.map((item) => (
            <div
              className="flex items-center justify-between w-full py-5"
              key={item.id}
            >
              <div className="flex items-center gap-[0.88rem]">
                <div className="text-gray-400 text-fn">{item.date}</div>
                <div className="text-b3">{item.title}</div>
              </div>
              <div className="flex flex-col items-end justify-center gap-2">
                <div
                  className={`text-bn2 ${
                    item.point > 0 ? 'text-primary-default' : 'text-gray-black'
                  }`}
                >
                  {item.point.toLocaleString()}P
                </div>
                <div className="text-gray-400 text-c1">
                  {item.totalPoint.toLocaleString()}P
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
