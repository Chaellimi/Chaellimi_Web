import React from 'react';
import Image from 'next/image';

interface ProductInfo {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  imgURL: string;
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

interface InventoryData {
  product: ProductInfo;
  inventories: InventoryItem[];
  totalCount: number;
  availableCount: number;
  soldCount: number;
  usedCount: number;
}

interface InventoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInventoryData: InventoryData | null;
  onAddInventory: () => void;
  onDeleteInventory: (inventoryId: number, productId: number) => void;
  isDeleting: boolean;
}

const InventoryManagementModal: React.FC<InventoryManagementModalProps> = ({
  isOpen,
  onClose,
  selectedInventoryData,
  onAddInventory,
  onDeleteInventory,
  isDeleting,
}) => {
  if (!isOpen || !selectedInventoryData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              재고 관리 - {selectedInventoryData.product.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={onAddInventory}
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
                        {new Date(inventory.expiration).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {new Date(inventory.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => {
                            onDeleteInventory(
                              inventory.id,
                              selectedInventoryData?.product.id
                            );
                          }}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          {isDeleting ? '삭제 중...' : '삭제'}
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
  );
};

export default InventoryManagementModal;
