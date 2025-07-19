'use client';

import { useGetUserRole } from '@/service/shared/shared.query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Loading from '../shared/Loading';

interface SidebarProps {
  activeMenu?: string;
}

const Sidebar = ({ activeMenu = 'dashboard' }: SidebarProps) => {
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'users', label: '유저 관리', icon: '👥' },
    { id: 'inventory', label: '재고 관리', icon: '📦' },
    { id: 'product', label: '상품 관리', icon: '🛍️' },
    { id: 'analytics', label: '분석', icon: '📈' },
  ];

  const handleMenuClick = (menuId: string) => {
    switch (menuId) {
      case 'dashboard':
        router.push('/admin');
        break;
      case 'users':
        router.push('/admin/user');
        break;
      case 'inventory':
        router.push('/admin/inventory');
        break;
      case 'product':
        router.push('/admin/product');
        break;
      case 'analytics':
        router.push('/admin/analytics');
        break;
      case 'orders':
        router.push('/admin/orders');
        break;
    }
  };

  const { data, isLoading } = useGetUserRole();
  const userData = data?.data?.UserData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-64 text-white bg-gray-800">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">Chaellimi</h1>
        <p className="text-sm text-gray-400">관리자 패널</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  item.id === activeMenu
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <Image
            src={userData?.profileImg}
            alt="Profile Image"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">{userData?.name}</p>
            <p className="text-xs text-gray-400">관리자</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
