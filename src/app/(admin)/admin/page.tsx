'use client';

import Sidebar from '@/components/Admin/Sidebar';
import React from 'react';

const AdminHome = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
      <Sidebar activeMenu="dashboard" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1">
        {/* 헤더 */}
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              관리자 대시보드
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 p-6 bg-gray-50">
          {/* 상단 카드들 */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 유저 관리 카드 */}
            <div
              onClick={() => (window.location.href = '/admin/user')}
              className="p-6 text-white transition-shadow cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">유저 관리</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-blue-100">총 사용자</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-400 rounded-full">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>

            {/* 재고 관리 카드 */}
            <div
              onClick={() => (window.location.href = '/admin/inventory')}
              className="p-6 text-white transition-shadow cursor-pointer bg-gradient-to-br from-green-500 to-green-600 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-100">재고 관리</p>
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-sm text-green-100">총 재고</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>

            {/* 상품 관리 카드 */}
            <div
              onClick={() => (window.location.href = '/admin/product')}
              className="p-6 text-white transition-shadow cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100">상품 관리</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-purple-100">총 상품</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-400 rounded-full">
                  <span className="text-2xl">🛍️</span>
                </div>
              </div>
            </div>
          </div>

          {/* 빠른 액세스 섹션 */}
          <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              빠른 액세스
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <button
                onClick={() => (window.location.href = '/admin/user')}
                className="p-4 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                <div className="text-center">
                  <div className="mb-2 text-2xl">👥</div>
                  <p className="text-sm font-medium text-gray-700">유저 관리</p>
                </div>
              </button>

              <button
                onClick={() => (window.location.href = '/admin/inventory')}
                className="p-4 transition-colors rounded-lg bg-green-50 hover:bg-green-100"
              >
                <div className="text-center">
                  <div className="mb-2 text-2xl">📦</div>
                  <p className="text-sm font-medium text-gray-700">재고 관리</p>
                </div>
              </button>

              <button
                onClick={() => (window.location.href = '/admin/product')}
                className="p-4 transition-colors rounded-lg bg-purple-50 hover:bg-purple-100"
              >
                <div className="text-center">
                  <div className="mb-2 text-2xl">🛍️</div>
                  <p className="text-sm font-medium text-gray-700">상품 관리</p>
                </div>
              </button>

              <button
                onClick={() => (window.location.href = '/admin/analytics')}
                className="p-4 transition-colors rounded-lg bg-yellow-50 hover:bg-yellow-100"
              >
                <div className="text-center">
                  <div className="mb-2 text-2xl">📈</div>
                  <p className="text-sm font-medium text-gray-700">분석</p>
                </div>
              </button>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              최근 활동
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 rounded-lg bg-green-50">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <span className="text-green-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    새로운 사용자 가입
                  </p>
                  <p className="text-xs text-gray-500">5분 전</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-blue-50">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <span className="text-blue-600">📦</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    재고 업데이트
                  </p>
                  <p className="text-xs text-gray-500">1시간 전</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-purple-50">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                  <span className="text-purple-600">🛍️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    새 상품 등록
                  </p>
                  <p className="text-xs text-gray-500">2시간 전</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
