'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Admin/Sidebar';

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  salesByCategory: { category: string; sales: number; percentage: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  userGrowth: { month: string; users: number }[];
}

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // 임시 데이터
  const [analyticsData] = useState<AnalyticsData>({
    totalSales: 1250000,
    totalOrders: 856,
    totalUsers: 1543,
    totalProducts: 89,
    salesByCategory: [
      { category: '카페', sales: 450000, percentage: 36 },
      { category: '피자', sales: 320000, percentage: 25.6 },
      { category: '치킨', sales: 280000, percentage: 22.4 },
      { category: '버거', sales: 150000, percentage: 12 },
      { category: '디저트', sales: 50000, percentage: 4 },
    ],
    monthlyRevenue: [
      { month: '1월', revenue: 980000 },
      { month: '2월', revenue: 1100000 },
      { month: '3월', revenue: 1350000 },
      { month: '4월', revenue: 1200000 },
      { month: '5월', revenue: 1450000 },
      { month: '6월', revenue: 1250000 },
    ],
    topProducts: [
      { name: '스타벅스 아메리카노', sales: 234, revenue: 1170000 },
      { name: '도미노피자 페퍼로니', sales: 156, revenue: 936000 },
      { name: 'BBQ 황금올리브', sales: 123, revenue: 738000 },
      { name: '버거킹 와퍼', sales: 98, revenue: 490000 },
      { name: '투썸플레이스 케이크', sales: 67, revenue: 335000 },
    ],
    userGrowth: [
      { month: '1월', users: 1200 },
      { month: '2월', users: 1280 },
      { month: '3월', users: 1350 },
      { month: '4월', users: 1420 },
      { month: '5월', users: 1500 },
      { month: '6월', users: 1543 },
    ],
  });

  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
      <Sidebar activeMenu="analytics" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">분석</h2>
            <div className="flex items-center space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">주간</option>
                <option value="month">월간</option>
                <option value="year">연간</option>
              </select>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* 주요 지표 카드 */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 매출</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalSales.toLocaleString()}P
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">+12.5% 전월 대비</span>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 주문</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalOrders.toLocaleString()}개
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-blue-600">+8.2% 전월 대비</span>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 회원</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalUsers.toLocaleString()}명
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-purple-600">
                  +15.3% 전월 대비
                </span>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 상품</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalProducts.toLocaleString()}개
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                  <span className="text-2xl">🛍️</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-orange-600">+5.1% 전월 대비</span>
              </div>
            </div>
          </div>

          {/* 차트 섹션 */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            {/* 카테고리별 매출 */}
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                카테고리별 매출
              </h3>
              <div className="space-y-4">
                {analyticsData.salesByCategory.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? 'bg-blue-500'
                            : index === 1
                              ? 'bg-green-500'
                              : index === 2
                                ? 'bg-yellow-500'
                                : index === 3
                                  ? 'bg-red-500'
                                  : 'bg-purple-500'
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {category.sales.toLocaleString()}P
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 월별 매출 */}
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                월별 매출
              </h3>
              <div className="space-y-3">
                {analyticsData.monthlyRevenue.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{
                            width: `${(month.revenue / 1500000) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-20 text-sm font-medium text-right text-gray-900">
                        {month.revenue.toLocaleString()}P
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 섹션 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 인기 상품 */}
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                인기 상품
              </h3>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                              ? 'bg-gray-400'
                              : index === 2
                                ? 'bg-orange-500'
                                : 'bg-blue-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.sales}개 판매
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {product.revenue.toLocaleString()}P
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 회원 증가 */}
            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                회원 증가
              </h3>
              <div className="space-y-3">
                {analyticsData.userGrowth.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-purple-600 rounded-full"
                          style={{ width: `${(month.users / 1600) * 100}%` }}
                        ></div>
                      </div>
                      <span className="w-16 text-sm font-medium text-right text-gray-900">
                        {month.users.toLocaleString()}명
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
