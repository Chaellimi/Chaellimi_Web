'use client';

import React from 'react';
import { ProductType } from '@/app/api/shop/Product.type';

interface EditProductModalProps {
  isOpen: boolean;
  editProduct: ProductType | null;
  isLoading: boolean;
  isUploadingImage?: boolean;
  onClose: () => void;
  onSave: () => void;
  onProductChange: (product: ProductType) => void;
  onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProductModal = ({
  isOpen,
  editProduct,
  isLoading,
  isUploadingImage = false,
  onClose,
  onSave,
  onProductChange,
  onImageUpload,
}: EditProductModalProps) => {
  if (!isOpen || !editProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">상품 수정</h2>
            <button
              onClick={onClose}
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
                  onProductChange({ ...editProduct, title: e.target.value })
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
                  onProductChange({ ...editProduct, brand: e.target.value })
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
                  onProductChange({ ...editProduct, price: e.target.value })
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
                  onProductChange({
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
              <div className="space-y-2">
                <input
                  type="text"
                  value={editProduct.imgURL}
                  onChange={(e) =>
                    onProductChange({ ...editProduct, imgURL: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {onImageUpload && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onImageUpload}
                      className="hidden"
                      id="product-image-upload"
                      disabled={isUploadingImage}
                    />
                    <label
                      htmlFor="product-image-upload"
                      className={`px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 ${
                        isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUploadingImage ? '업로드 중...' : '이미지 업로드'}
                    </label>
                  </div>
                )}
              </div>
            </div>

            {editProduct.explanation !== undefined && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  설명
                </label>
                <textarea
                  value={editProduct.explanation || ''}
                  onChange={(e) =>
                    onProductChange({
                      ...editProduct,
                      explanation: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={onSave}
                disabled={isLoading || isUploadingImage}
                className={`flex-1 px-4 py-2 text-sm text-white rounded-md ${
                  isLoading || isUploadingImage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? '저장 중...' : '저장'}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading || isUploadingImage}
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
