'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Admin/Sidebar';

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
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // 임시 데이터
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      name: '김철수',
      points: 1500,
      role: 'USER',
      isActive: true,
      createdAt: '2024-01-15',
      lastLogin: '2025-07-15',
      profileImage: '/images/default-profile.png',
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      name: '이영희',
      points: 2300,
      role: 'USER',
      isActive: true,
      createdAt: '2024-02-20',
      lastLogin: '2025-07-14',
      profileImage: '/images/default-profile.png',
    },
    {
      id: 3,
      username: 'admin1',
      email: 'admin@example.com',
      name: '관리자',
      points: 0,
      role: 'ADMIN',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: '2025-07-16',
      profileImage: '/images/default-profile.png',
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && user.isActive) ||
      (selectedStatus === 'inactive' && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserDetail = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser({ ...user });
    setIsEditMode(true);
  };

  const handleSaveUser = () => {
    if (!editUser) return;
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setIsEditMode(false);
    setEditUser(null);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

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
                총 유저: {users.length}명 | 활성:{' '}
                {users.filter((u) => u.isActive).length}명
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
              <div className="sm:w-40">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">전체 상태</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </div>
          </div>

          {/* 유저 테이블 */}
          <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      유저 정보
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      이메일
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      포인트
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      권한
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      상태
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      마지막 로그인
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative w-10 h-10">
                            <Image
                              src={
                                user.profileImage ||
                                '/images/default-profile.png'
                              }
                              alt={user.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {user.points.toLocaleString()}P
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user.role === 'ADMIN' ? '관리자' : '일반 유저'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.isActive ? '활성' : '비활성'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUserDetail(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            상세
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-green-600 hover:text-green-900"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`${
                              user.isActive
                                ? 'text-red-600 hover:text-red-900'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {user.isActive ? '비활성화' : '활성화'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-lg text-gray-500">
                  검색 결과가 없습니다.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 유저 상세 모달 */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">유저 상세 정보</h2>
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={
                        selectedUser.profileImage ||
                        '/images/default-profile.png'
                      }
                      alt={selectedUser.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-600">@{selectedUser.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      이메일
                    </label>
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      포인트
                    </label>
                    <p className="text-gray-900">
                      {selectedUser.points.toLocaleString()}P
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      권한
                    </label>
                    <p className="text-gray-900">
                      {selectedUser.role === 'ADMIN' ? '관리자' : '일반 유저'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      상태
                    </label>
                    <p className="text-gray-900">
                      {selectedUser.isActive ? '활성' : '비활성'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      가입일
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      마지막 로그인
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedUser.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editUser.isActive}
                    onChange={(e) =>
                      setEditUser({ ...editUser, isActive: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    활성 상태
                  </label>
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
