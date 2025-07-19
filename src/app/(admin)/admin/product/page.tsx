'use client';

import React, { useState } from 'react';
import { useGetProduct } from '@/service/Shop/shop.query';
import {
  useEditAdminProduct,
  useCreateAdminProduct,
} from '@/service/Admin/admin.query';
import { usePostUploadImg } from '@/service/shared/shared.query';
import Loading from '@/components/shared/Loading';
import Image from 'next/image';
import { ProductType } from '@/app/api/shop/Product.type';
import Sidebar from '@/components/Admin/Sidebar';
import EditProductModal from '@/components/Admin/Product/EditProductModal';
import AddProductModal from '@/components/Admin/Product/AddProductModal';

const ProductManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    brand: '',
    price: 0,
    category: 'cafe',
    imgURL: '',
    explanation: '',
    isActive: true,
  });

  const { data, isLoading } = useGetProduct();
  const editProductMutation = useEditAdminProduct();
  const createProductMutation = useCreateAdminProduct();
  const uploadImgMutation = usePostUploadImg();
  const products = data?.data || [];

  const filteredProducts = products.filter((product: ProductType) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductDetail = (product: ProductType) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: ProductType) => {
    setEditProduct({ ...product });
    setIsEditMode(true);
  };

  const handleSaveProduct = async () => {
    if (!editProduct) return;

    try {
      await editProductMutation.mutateAsync({
        productId: editProduct.id || 0,
        category: editProduct.category,
        imgURL: editProduct.imgURL,
        brand: editProduct.brand,
        price: editProduct.price,
        title: editProduct.title,
        explanation: editProduct.explanation || '',
      });

      setIsEditMode(false);
      setEditProduct(null);
    } catch (error) {
      console.error('상품 수정 실패:', error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editProduct) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImgMutation.mutateAsync(formData);

      if (response.success && response.data?.fileUrl) {
        setEditProduct({
          ...editProduct,
          imgURL: response.data.fileUrl,
        });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNewProductImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImgMutation.mutateAsync(formData);

      if (response.success && response.data?.fileUrl) {
        setNewProduct({
          ...newProduct,
          imgURL: response.data.fileUrl,
        });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleSaveNewProduct = async () => {
    if (!newProduct.title || !newProduct.brand || !newProduct.imgURL) {
      alert('필수 필드를 모두 입력해주세요.');
      return;
    }

    try {
      await createProductMutation.mutateAsync({
        title: newProduct.title,
        brand: newProduct.brand,
        price: newProduct.price,
        category: newProduct.category,
        imgURL: newProduct.imgURL,
        explanation: newProduct.explanation,
      });

      setIsAddProductModalOpen(false);
      setNewProduct({
        title: '',
        brand: '',
        price: 0,
        category: 'cafe',
        imgURL: '',
        explanation: '',
        isActive: true,
      });
    } catch (error) {
      console.error('상품 추가 실패:', error);
    }
  };

  const handleToggleStatus = (productId: number) => {
    console.log('상품 상태 변경:', productId);
  };

  const handleDeleteProduct = (productId: number) => {
    console.log('상품 삭제:', productId);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
      <Sidebar activeMenu="product" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1 h-full overflow-y-scroll">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">상품 관리</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                + 상품 추가
              </button>
              <span className="text-sm text-gray-500">
                총 상품: {products.length}개
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
            {filteredProducts.map((product: ProductType) => (
              <div
                key={product.id}
                className="overflow-hidden transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.imgURL}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <span className="ml-2 text-sm text-gray-500">
                      {product.brand}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}P
                    </span>
                    <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {product.brand} 상품
                    </div>
                  </div>

                  <div className="flex mt-4 space-x-2">
                    <button
                      onClick={() => handleProductDetail(product)}
                      className="flex-1 px-3 py-2 text-sm text-blue-600 transition-colors border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      상세
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      수정
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">검색 결과가 없습니다.</div>
            </div>
          )}
        </main>
      </div>

      {/* 상품 상세 모달 */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">상품 상세 정보</h2>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative mb-4 aspect-square">
                  <Image
                    src={selectedProduct.imgURL}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      상품명
                    </label>
                    <p className="text-gray-900">{selectedProduct.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      브랜드
                    </label>
                    <p className="text-gray-900">{selectedProduct.brand}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      가격
                    </label>
                    <p className="text-gray-900">{selectedProduct.price}P</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      카테고리
                    </label>
                    <p className="text-gray-900">{selectedProduct.category}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    설명
                  </label>
                  <p className="text-gray-900 whitespace-pre-line">
                    {selectedProduct.brand} 상품입니다.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleStatus(selectedProduct.id || 0)}
                    className="px-4 py-2 text-sm text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-50"
                  >
                    상태 변경
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(selectedProduct.id || 0)}
                    className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 상품 수정 모달 */}
      <EditProductModal
        isOpen={isEditMode}
        editProduct={editProduct}
        isLoading={editProductMutation.isPending}
        isUploadingImage={uploadImgMutation.isPending}
        onClose={() => setIsEditMode(false)}
        onSave={handleSaveProduct}
        onProductChange={setEditProduct}
        onImageUpload={handleImageUpload}
      />

      {/* 상품 추가 모달 */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        newProduct={newProduct}
        isLoading={createProductMutation.isPending}
        isUploadingImage={uploadImgMutation.isPending}
        onClose={() => setIsAddProductModalOpen(false)}
        onSave={handleSaveNewProduct}
        onProductChange={setNewProduct}
        onImageUpload={handleNewProductImageUpload}
      />
    </div>
  );
};

export default ProductManagement;
