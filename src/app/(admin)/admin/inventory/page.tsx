'use client';

import React, { useState } from 'react';
import {
  useGetAdminInventory,
  useCreateAdminInventory,
  useDeleteAdminInventory,
} from '@/service/Admin/admin.query';
import { usePostUploadImg } from '@/service/shared/shared.query';
import Loading from '@/components/shared/Loading';
import Image from 'next/image';
import Sidebar from '@/components/Admin/Sidebar';
import InventoryManagementModal from '@/components/Admin/InventoryManagementModal';
import AddInventoryModal from '@/components/Admin/AddInventoryModal';

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

  const { data, isLoading, refetch } = useGetAdminInventory();
  const createInventoryMutation = useCreateAdminInventory();
  const deleteInventoryMutation = useDeleteAdminInventory();
  const uploadImgMutation = usePostUploadImg();
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
    setIsAddInventoryModalOpen(true);
  };

  const handleSaveInventory = async (data: {
    productId: number;
    imgURL: string;
    expiration: string;
    selectedFile: File | null;
  }) => {
    try {
      let imageUrl = '/images/barcode.jpg';

      if (data.selectedFile) {
        const formData = new FormData();
        formData.append('image', data.selectedFile);

        const uploadResult = await uploadImgMutation.mutateAsync(formData);
        if (uploadResult?.data?.imgURL) {
          imageUrl = uploadResult.data.imgURL;
        }
      }

      await createInventoryMutation.mutateAsync({
        productId: data.productId,
        imgURL: imageUrl,
        expiration: data.expiration,
      });

      setIsAddInventoryModalOpen(false);

      const refreshedData = await refetch();
      if (selectedInventoryData && refreshedData.data?.data) {
        const updatedInventoryData = refreshedData.data.data.find(
          (item: InventoryData) =>
            item.product.id === selectedInventoryData.product.id
        );
        if (updatedInventoryData) {
          setSelectedInventoryData(updatedInventoryData);
        }
      }
    } catch (error) {
      console.error('재고 추가 실패:', error);
      alert('재고 추가에 실패했습니다.');
    }
  };

  const handleDeleteInventory = async (
    inventoryId: number,
    productId: number
  ) => {
    if (!confirm('정말로 이 재고를 삭제하시겠습니까?')) {
      return;
    }

    console.log(productId, inventoryId);

    try {
      await deleteInventoryMutation.mutateAsync({
        productId,
        inventoryId,
      });

      const refreshedData = await refetch();
      if (selectedInventoryData && refreshedData.data?.data) {
        const updatedInventoryData = refreshedData.data.data.find(
          (item: InventoryData) =>
            item.product.id === selectedInventoryData.product.id
        );
        if (updatedInventoryData) {
          setSelectedInventoryData(updatedInventoryData);
        }
      }
    } catch (error) {
      console.error('재고 삭제 실패:', error);
      alert('재고 삭제에 실패했습니다.');
    }
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
                    <div className="p-2 text-center rounded bg-blue-50">
                      <div className="font-semibold text-blue-600">
                        {inventoryData.totalCount}
                      </div>
                      <div className="text-gray-600">총 재고</div>
                    </div>
                    <div className="p-2 text-center rounded bg-green-50">
                      <div className="font-semibold text-green-600">
                        {inventoryData.availableCount}
                      </div>
                      <div className="text-gray-600">사용 가능</div>
                    </div>
                    <div className="p-2 text-center rounded bg-yellow-50">
                      <div className="font-semibold text-yellow-600">
                        {inventoryData.soldCount}
                      </div>
                      <div className="text-gray-600">판매됨</div>
                    </div>
                    <div className="p-2 text-center rounded bg-red-50">
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

      {/* 새로운 모달 컴포넌트들 */}
      <InventoryManagementModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        selectedInventoryData={selectedInventoryData}
        onAddInventory={handleAddInventory}
        onDeleteInventory={handleDeleteInventory}
        isDeleting={deleteInventoryMutation.isPending}
      />

      <AddInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => setIsAddInventoryModalOpen(false)}
        onSave={handleSaveInventory}
        productId={selectedInventoryData?.product.id || 0}
        isSaving={createInventoryMutation.isPending}
      />
    </div>
  );
};

export default InventoryManagement;
