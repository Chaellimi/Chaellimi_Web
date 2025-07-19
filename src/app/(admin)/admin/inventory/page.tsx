'use client';

import React, { useState } from 'react';
import { useGetAdminInventory } from '@/service/Admin/admin.query';
import Loading from '@/components/shared/Loading';
import Image from 'next/image';
import Sidebar from '@/components/Admin/Sidebar';

interface ProductInfo {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  imgURL: string;
}

interface InventoryData {
  product: ProductInfo;
  inventories: InventoryItem[];
  totalCount: number;
  availableCount: number;
  soldCount: number;
  usedCount: number;
}

interface InventoryItem {
  id: number;
  productId: number;
  imgURL: string;
  isSold: boolean;
  isUse: boolean;
  expiration: string;
  createdAt: string;
  updatedAt: string;
}

const InventoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInventoryData, setSelectedInventoryData] =
    useState<InventoryData | null>(null);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);
  const [newInventory, setNewInventory] = useState({
    productId: 0,
    imgURL: '',
    expiration: '',
  });

  const { data, isLoading } = useGetAdminInventory();
  const inventoryList = data?.data || [];

  const filteredInventories = inventoryList.filter(
    (inventoryData: InventoryData) => {
      const product = inventoryData.product;
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );

  const handleInventoryDetail = async (inventoryData: InventoryData) => {
    setSelectedInventoryData(inventoryData);
    setIsInventoryModalOpen(true);
  };

  const handleAddInventory = () => {
    if (!selectedInventoryData) return;
    setNewInventory({
      productId: selectedInventoryData.product.id,
      imgURL: selectedInventoryData.product.imgURL,
      expiration: '',
    });
    setIsAddInventoryModalOpen(true);
  };

  const handleSaveInventory = () => {
    // 실제 API 호출로 재고 추가
    console.log('재고 추가:', newInventory);
    setIsAddInventoryModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
      <Sidebar activeMenu="inventory" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1 h-full overflow-y-scroll">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">재고 관리</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                총 상품: {inventoryList.length}개
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          {/* 컨트롤 섹션 */}
          <div className="p-6 mb-6 bg-white border rounded-lg shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="상품명 또는 브랜드 검색..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-48">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">전체 카테고리</option>
                  <option value="cafe">카페</option>
                  <option value="pizza">피자</option>
                  <option value="chicken">치킨</option>
                  <option value="burger">버거</option>
                  <option value="dessert">디저트</option>
                  <option value="store">스토어</option>
                  <option value="coupon">쿠폰</option>
                </select>
              </div>
            </div>
          </div>

          {/* 상품 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredInventories.map((inventoryData: InventoryData) => (
              <div
                key={inventoryData.product.id}
                className="overflow-hidden transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <Image
                    src={inventoryData.product.imgURL}
                    alt={inventoryData.product.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inventoryData.availableCount > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {inventoryData.availableCount > 0
                        ? '재고 있음'
                        : '재고 없음'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {inventoryData.product.title}
                    </h3>
                    <span className="ml-2 text-sm text-gray-500">
                      {inventoryData.product.brand}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      {inventoryData.product.price}P
                    </span>
                    <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full">
                      {inventoryData.product.category}
                    </span>
                  </div>

                  {/* 재고 통계 */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">
                        {inventoryData.totalCount}
                      </div>
                      <div className="text-gray-600">총 재고</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">
                        {inventoryData.availableCount}
                      </div>
                      <div className="text-gray-600">사용 가능</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="font-semibold text-yellow-600">
                        {inventoryData.soldCount}
                      </div>
                      <div className="text-gray-600">판매됨</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="font-semibold text-red-600">
                        {inventoryData.usedCount}
                      </div>
                      <div className="text-gray-600">사용됨</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleInventoryDetail(inventoryData)}
                      className="w-full px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      재고 관리
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredInventories.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">검색 결과가 없습니다.</div>
            </div>
          )}
        </main>
      </div>

      {/* 재고 관리 모달 */}
      {isInventoryModalOpen && selectedInventoryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  재고 관리 - {selectedInventoryData.product.title}
                </h2>
                <button
                  onClick={() => setIsInventoryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <button
                  onClick={handleAddInventory}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  + 재고 추가
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        이미지
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        판매 상태
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        사용 상태
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        만료일
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInventoryData.inventories.map(
                      (inventory: InventoryItem) => (
                        <tr key={inventory.id}>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {inventory.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="relative w-10 h-10">
                              <Image
                                src={inventory.imgURL}
                                alt="재고 이미지"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                inventory.isSold
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {inventory.isSold ? '판매완료' : '판매가능'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                inventory.isUse
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {inventory.isUse ? '사용완료' : '사용가능'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {new Date(
                              inventory.expiration
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {new Date(inventory.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button className="text-red-600 hover:text-red-900">
                              삭제
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {selectedInventoryData.inventories.length === 0 && (
                <div className="py-8 text-center">
                  <div className="text-gray-500">재고가 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 재고 추가 모달 */}
      {isAddInventoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">재고 추가</h2>
                <button
                  onClick={() => setIsAddInventoryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    이미지 URL
                  </label>
                  <input
                    type="text"
                    value={newInventory.imgURL}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        imgURL: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    만료일
                  </label>
                  <input
                    type="date"
                    value={newInventory.expiration}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        expiration: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveInventory}
                    className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsAddInventoryModalOpen(false)}
                    className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
