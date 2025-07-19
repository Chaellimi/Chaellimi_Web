'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';

interface EditModalProps {
  isOpen: boolean;
  editUser: User | null;
  isLoading: boolean;
  isUploadingImage: boolean;
  onClose: () => void;
  onSave: () => void;
  onUserChange: (user: User) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditModal = ({
  isOpen,
  editUser,
  isLoading,
  isUploadingImage,
  onClose,
  onSave,
  onUserChange,
  onImageUpload,
}: EditModalProps) => {
  if (!isOpen || !editUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">유저 수정</h2>
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
                프로필 이미지
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={editUser.profileImage || '/images/default-profile.png'}
                    alt={editUser.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                    id="profile-image-upload"
                    disabled={isUploadingImage}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className={`px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 ${
                      isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUploadingImage ? '업로드 중...' : '이미지 변경'}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  onUserChange({ ...editUser, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  onUserChange({ ...editUser, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                포인트
              </label>
              <input
                type="number"
                value={editUser.points}
                onChange={(e) =>
                  onUserChange({
                    ...editUser,
                    points: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                권한
              </label>
              <select
                value={editUser.role}
                onChange={(e) =>
                  onUserChange({
                    ...editUser,
                    role: e.target.value as 'USER' | 'ADMIN',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USER">일반 유저</option>
                <option value="ADMIN">관리자</option>
              </select>
            </div>

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

export default EditModal;
