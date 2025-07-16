'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Order {
  id: number;
  orderNumber: string;
  userName: string;
  userEmail: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: string;
  orderDate: string;
  completedDate?: string;
}

const Orders = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // 임시 데이터
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-2025-001',
      userName: '김철수',
      userEmail: 'kimcs@example.com',
      productName: '스타벅스 아메리카노',
      productImage: '/images/default-challenge.png',
      quantity: 2,
      price: 5000,
      totalAmount: 10000,
      status: 'completed',
      paymentMethod: '포인트',
      orderDate: '2025-07-15',
      completedDate: '2025-07-15',
    },
    {
      id: 2,
      orderNumber: 'ORD-2025-002',
      userName: '이영희',
      userEmail: 'leeyh@example.com',
      productName: '도미노피자 페퍼로니',
      productImage: '/images/default-challenge.png',
      quantity: 1,
      price: 25000,
      totalAmount: 25000,
      status: 'confirmed',
      paymentMethod: '포인트',
      orderDate: '2025-07-16',
    },
    {
      id: 3,
      orderNumber: 'ORD-2025-003',
      userName: '박민수',
      userEmail: 'parkms@example.com',
      productName: 'BBQ 황금올리브',
      productImage: '/images/default-challenge.png',
      quantity: 1,
      price: 18000,
      totalAmount: 18000,
      status: 'pending',
      paymentMethod: '포인트',
      orderDate: '2025-07-16',
    },
    {
      id: 4,
      orderNumber: 'ORD-2025-004',
      userName: '최지영',
      userEmail: 'choijy@example.com',
      productName: '버거킹 와퍼',
      productImage: '/images/default-challenge.png',
      quantity: 3,
      price: 8000,
      totalAmount: 24000,
      status: 'cancelled',
      paymentMethod: '포인트',
      orderDate: '2025-07-14',
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              completedDate:
                newStatus === 'completed'
                  ? new Date().toISOString().split('T')[0]
                  : order.completedDate,
            }
          : order
      )
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '대기중';
      case 'confirmed':
        return '확인됨';
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소됨';
      default:
        return '알 수 없음';
    }
  };

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'users', label: '유저 관리', icon: '👥' },
    { id: 'inventory', label: '재고 관리', icon: '📦' },
    { id: 'products', label: '상품 관리', icon: '🛍️' },
    { id: 'orders', label: '주문 관리', icon: '📋' },
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
      case 'products':
        router.push('/admin/product');
        break;
      case 'orders':
        router.push('/admin/orders');
        break;
      case 'analytics':
        router.push('/admin/analytics');
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* 사이드바 */}
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
                    item.id === 'orders'
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
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">관리자</p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col flex-1">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">주문 관리</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                총 주문: {orders.length}건 | 완료:{' '}
                {orders.filter((o) => o.status === 'completed').length}건
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
                  placeholder="주문번호, 고객명, 상품명 검색..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-40">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">전체 상태</option>
                  <option value="pending">대기중</option>
                  <option value="confirmed">확인됨</option>
                  <option value="completed">완료</option>
                  <option value="cancelled">취소됨</option>
                </select>
              </div>
            </div>
          </div>

          {/* 주문 테이블 */}
          <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      주문 정보
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      고객 정보
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      상품 정보
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      결제 정보
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      상태
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      주문일
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          수량: {order.quantity}개
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.userEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative w-10 h-10 mr-3">
                            <Image
                              src={order.productImage}
                              alt={order.productName}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.productName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.price.toLocaleString()}P
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.totalAmount.toLocaleString()}P
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOrderDetail(order)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            상세
                          </button>
                          {order.status === 'pending' && (
                            <button
                              onClick={() =>
                                handleStatusChange(order.id, 'confirmed')
                              }
                              className="text-green-600 hover:text-green-900"
                            >
                              확인
                            </button>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() =>
                                handleStatusChange(order.id, 'completed')
                              }
                              className="text-green-600 hover:text-green-900"
                            >
                              완료
                            </button>
                          )}
                          {(order.status === 'pending' ||
                            order.status === 'confirmed') && (
                            <button
                              onClick={() =>
                                handleStatusChange(order.id, 'cancelled')
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              취소
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-lg text-gray-500">
                  검색 결과가 없습니다.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 주문 상세 모달 */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">주문 상세 정보</h2>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* 주문 정보 */}
                <div className="pb-4 border-b">
                  <h3 className="mb-3 text-lg font-semibold">주문 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        주문번호
                      </label>
                      <p className="text-gray-900">
                        {selectedOrder.orderNumber}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        주문일
                      </label>
                      <p className="text-gray-900">
                        {new Date(selectedOrder.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        상태
                      </label>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}
                      >
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                    {selectedOrder.completedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          완료일
                        </label>
                        <p className="text-gray-900">
                          {new Date(
                            selectedOrder.completedDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 고객 정보 */}
                <div className="pb-4 border-b">
                  <h3 className="mb-3 text-lg font-semibold">고객 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        고객명
                      </label>
                      <p className="text-gray-900">{selectedOrder.userName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        이메일
                      </label>
                      <p className="text-gray-900">{selectedOrder.userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* 상품 정보 */}
                <div className="pb-4 border-b">
                  <h3 className="mb-3 text-lg font-semibold">상품 정보</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={selectedOrder.productImage}
                        alt={selectedOrder.productName}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-medium text-gray-900">
                        {selectedOrder.productName}
                      </div>
                      <div className="text-gray-600">
                        단가: {selectedOrder.price.toLocaleString()}P
                      </div>
                      <div className="text-gray-600">
                        수량: {selectedOrder.quantity}개
                      </div>
                    </div>
                  </div>
                </div>

                {/* 결제 정보 */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">결제 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        결제 방법
                      </label>
                      <p className="text-gray-900">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        총 결제 금액
                      </label>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedOrder.totalAmount.toLocaleString()}P
                      </p>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex pt-4 space-x-2">
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, 'confirmed');
                        setIsOrderModalOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      주문 확인
                    </button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, 'completed');
                        setIsOrderModalOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      주문 완료
                    </button>
                  )}
                  {(selectedOrder.status === 'pending' ||
                    selectedOrder.status === 'confirmed') && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, 'cancelled');
                        setIsOrderModalOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      주문 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
