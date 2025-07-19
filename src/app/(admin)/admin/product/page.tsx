'use client';

import React, { useState } from 'react';
import { useGetProduct } from '@/service/Shop/shop.query';
import Loading from '@/components/shared/Loading';
import Image from 'next/image';
import { ProductType } from '@/app/api/shop/Product.type';
import Sidebar from '@/components/Admin/Sidebar';

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
    description: '',
    isActive: true,
  });

  const { data, isLoading } = useGetProduct();
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

  const handleSaveProduct = () => {
    if (!editProduct) return;
    // 실제 API 호출로 상품 정보 업데이트
    console.log('상품 업데이트:', editProduct);
    setIsEditMode(false);
    setEditProduct(null);
  };

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleSaveNewProduct = () => {
    // 실제 API 호출로 새 상품 추가
    console.log('새 상품 추가:', newProduct);
    setIsAddProductModalOpen(false);
    setNewProduct({
      title: '',
      brand: '',
      price: 0,
      category: 'cafe',
      imgURL: '',
      description: '',
      isActive: true,
    });
  };

  const handleToggleStatus = (productId: number) => {
    // 실제 API 호출로 상품 상태 변경
    console.log('상품 상태 변경:', productId);
  };

  const handleDeleteProduct = (productId: number) => {
    // 실제 API 호출로 상품 삭제
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
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      활성
                    </span>
                  </div>
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
      {isEditMode && editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">상품 수정</h2>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    상품명
                  </label>
                  <input
                    type="text"
                    value={editProduct.title}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    브랜드
                  </label>
                  <input
                    type="text"
                    value={editProduct.brand}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    가격
                  </label>
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    카테고리
                  </label>
                  <select
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cafe">카페</option>
                    <option value="pizza">피자</option>
                    <option value="chicken">치킨</option>
                    <option value="burger">버거</option>
                    <option value="dessert">디저트</option>
                    <option value="store">스토어</option>
                    <option value="coupon">쿠폰</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    이미지 URL
                  </label>
                  <input
                    type="text"
                    value={editProduct.imgURL}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, imgURL: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsEditMode(false)}
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

      {/* 상품 추가 모달 */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">상품 추가</h2>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    상품명
                  </label>
                  <input
                    type="text"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    브랜드
                  </label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    가격
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    카테고리
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cafe">카페</option>
                    <option value="pizza">피자</option>
                    <option value="chicken">치킨</option>
                    <option value="burger">버거</option>
                    <option value="dessert">디저트</option>
                    <option value="store">스토어</option>
                    <option value="coupon">쿠폰</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    이미지 URL
                  </label>
                  <input
                    type="text"
                    value={newProduct.imgURL}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, imgURL: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    설명
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveNewProduct}
                    className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsAddProductModalOpen(false)}
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

export default ProductManagement;
