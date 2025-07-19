'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import UserTable from '@/components/Admin/User/Table';
import { useGetAdminUser } from '@/service/Admin/admin.query';
import Loading from '@/components/shared/Loading';

interface ApiUser {
  userId: number;
  authId: string;
  email: string;
  name: string;
  profileImg: string;
  provider: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Point: {
    totalPoint: string;
  } | null;
}

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  points: number;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  profileImage?: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const { data, isLoading } = useGetAdminUser();
  const userList = data?.data || [];

  // 실제 API 데이터를 UI 형태로 변환
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

  const handleSaveUser = () => {
    if (!editUser) return;
    // API 호출로 실제 업데이트 해야함 (현재는 로컬 상태만 업데이트)
    setIsEditMode(false);
    setEditUser(null);
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
      {isEditMode && editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">유저 수정</h2>
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
                    이름
                  </label>
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
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
                      setEditUser({ ...editUser, email: e.target.value })
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
                      setEditUser({
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
                      setEditUser({
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
                    onClick={handleSaveUser}
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
    </div>
  );
};

export default UserManagement;
