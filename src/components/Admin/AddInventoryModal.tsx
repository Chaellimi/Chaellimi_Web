import React, { useState } from 'react';
import Image from 'next/image';

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    productId: number;
    imgURL: string;
    expiration: string;
    selectedFile: File | null;
  }) => Promise<void>;
  productId: number;
  isSaving: boolean;
}

const AddInventoryModal: React.FC<AddInventoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productId,
  isSaving,
}) => {
  const [newInventory, setNewInventory] = useState({
    productId: productId,
    imgURL: '',
    expiration: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  React.useEffect(() => {
    if (isOpen) {
      setNewInventory({
        productId: productId,
        imgURL: '',
        expiration: '',
      });
      setSelectedFile(null);
      setPreviewImage('');
    }
  }, [isOpen, productId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 미리보기 이미지 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await onSave({
      productId: newInventory.productId,
      imgURL: newInventory.imgURL,
      expiration: newInventory.expiration,
      selectedFile: selectedFile,
    });
    setSelectedFile(null);
    setPreviewImage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">재고 추가</h2>
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
                이미지 업로드
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewImage && (
                <div className="mt-2">
                  <div className="relative w-20 h-20">
                    <Image
                      src={previewImage}
                      alt="미리보기"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              )}
              <p className="mt-1 text-xs text-gray-500">
                이미지를 업로드하지 않으면 기본 바코드 이미지가 사용됩니다.
              </p>
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
                required
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={!newInventory.expiration || isSaving}
                className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
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

export default AddInventoryModal;
