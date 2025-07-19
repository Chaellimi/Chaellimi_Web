'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import UserTable from '@/components/Admin/User/Table';
import EditModal from '@/components/Admin/User/EditModal';
import { useGetAdminUser, useEditAdminUser } from '@/service/Admin/admin.query';
import { usePostUploadImg } from '@/service/shared/shared.query';
import Loading from '@/components/shared/Loading';
import { User, ApiUser } from '@/types/user';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const { data, isLoading } = useGetAdminUser();
  const editUserMutation = useEditAdminUser();
  const uploadImgMutation = usePostUploadImg();
  const userList = data?.data || [];

  const users: User[] = userList.map((user: ApiUser) => ({
    id: user.userId,
    username: user.email.split('@')[0],
    email: user.email,
    name: user.name,
    points: user.Point ? parseInt(user.Point.totalPoint) : 0,
    role: user.role === 'admin' ? 'ADMIN' : 'USER',
    isActive: user.deletedAt === null,
    createdAt: user.createdAt,
    lastLogin: user.updatedAt,
    profileImage: user.profileImg,
  }));

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user: User) => {
    setEditUser({ ...user });
    setIsEditMode(true);
  };

  const handleSaveUser = async () => {
    if (!editUser) return;

    try {
      await editUserMutation.mutateAsync({
        userId: editUser.id,
        name: editUser.name,
        email: editUser.email,
        points: editUser.points,
        role: editUser.role.toLowerCase(),
        profileImg: editUser.profileImage,
      });

      setIsEditMode(false);
      setEditUser(null);
    } catch (error) {
      console.error('유저 수정 실패:', error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editUser) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImgMutation.mutateAsync(formData);

      if (response.success && response.data?.fileUrl) {
        setEditUser({
          ...editUser,
          profileImage: response.data.fileUrl,
        });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
      <Sidebar activeMenu="users" />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1 h-full overflow-y-scroll">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">유저 관리</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                총 유저: {users.length}명
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
                  placeholder="유저명, 이름, 이메일 검색..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-40">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">전체 권한</option>
                  <option value="USER">일반 유저</option>
                  <option value="ADMIN">관리자</option>
                </select>
              </div>
            </div>
          </div>

          {/* 유저 테이블 */}
          <UserTable users={filteredUsers} onEditUser={handleEditUser} />
        </main>
      </div>

      {/* 유저 수정 모달 */}
      <EditModal
        isOpen={isEditMode}
        editUser={editUser}
        isLoading={editUserMutation.isPending}
        isUploadingImage={uploadImgMutation.isPending}
        onClose={() => setIsEditMode(false)}
        onSave={handleSaveUser}
        onUserChange={setEditUser}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default UserManagement;
