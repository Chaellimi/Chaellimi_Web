import React from 'react';
import Image from 'next/image';

interface NewProductType {
  title: string;
  brand: string;
  price: number;
  category: string;
  imgURL: string;
  explanation: string;
  isActive: boolean;
}

interface AddProductModalProps {
  isOpen: boolean;
  newProduct: NewProductType;
  isLoading: boolean;
  isUploadingImage: boolean;
  onClose: () => void;
  onSave: () => void;
  onProductChange: (product: NewProductType) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  newProduct,
  isLoading,
  isUploadingImage,
  onClose,
  onSave,
  onProductChange,
  onImageUpload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">상품 추가</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* 이미지 미리보기 및 업로드 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                상품 이미지
              </label>
              {newProduct.imgURL && (
                <div className="relative w-full h-40 mb-2">
                  <Image
                    src={newProduct.imgURL}
                    alt="상품 미리보기"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                disabled={isUploadingImage || isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isUploadingImage && (
                <p className="text-sm text-blue-600">이미지 업로드 중...</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                상품명
              </label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) =>
                  onProductChange({ ...newProduct, title: e.target.value })
                }
                disabled={isLoading}
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
                  onProductChange({ ...newProduct, brand: e.target.value })
                }
                disabled={isLoading}
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
                  onProductChange({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                disabled={isLoading}
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
                  onProductChange({ ...newProduct, category: e.target.value })
                }
                disabled={isLoading}
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
                설명
              </label>
              <textarea
                value={newProduct.explanation}
                onChange={(e) =>
                  onProductChange({
                    ...newProduct,
                    explanation: e.target.value,
                  })
                }
                disabled={isLoading}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={onSave}
                disabled={isLoading || isUploadingImage}
                className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? '저장 중...' : '저장'}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
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

export default AddProductModal;
