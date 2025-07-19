'use client';

import React from 'react';
import Image from 'next/image';

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

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
}

const UserTable = ({ users, onEditUser }: UserTableProps) => {
  return (
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
                액션
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10">
                      <Image
                        src={user.profileImage || '/images/default-profile.png'}
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
                  <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    활성
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-green-600 hover:text-green-900"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-lg text-gray-500">검색 결과가 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
