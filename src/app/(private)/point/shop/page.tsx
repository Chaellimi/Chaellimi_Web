'use client';

import { CustodyType, ProductType } from '@/app/api/shop/Product.type';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useGetPoint } from '@/service/Point/point.query';
import { useGetCustody, useGetProduct } from '@/service/Shop/shop.query';
import {
  AllIcon,
  BurgerIcon,
  CafeIcon,
  ChickenIcon,
  CouponIcon,
  DessertIcon,
  PizzaIcon,
  PointIcon,
  StoreIcon,
} from '@public/icons/PointShop';
import { MagnifyingGlassIcon } from '@public/icons/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const PointShopFilter = [
  { id: 1, name: '둘러보기' },
  { id: 2, name: '보관함' },
];

const PointShopCategories = [
  { id: 1, name: '전체보기', Icon: <AllIcon />, apiValue: 'All' },
  { id: 2, name: '카페', Icon: <CafeIcon />, apiValue: 'Cafe' },
  { id: 3, name: '피자', Icon: <PizzaIcon />, apiValue: 'Pizza' },
  { id: 4, name: '치킨', Icon: <ChickenIcon />, apiValue: 'Chicken' },
  { id: 5, name: '버거', Icon: <BurgerIcon />, apiValue: 'Burger' },
  { id: 6, name: '디저트', Icon: <DessertIcon />, apiValue: 'Dessert' },
  { id: 7, name: '편의점', Icon: <StoreIcon />, apiValue: 'Store' },
  { id: 8, name: '상품권', Icon: <CouponIcon />, apiValue: 'Coupon' },
];

const Shop = () => {
  const activeTab = useSearchParams().get('activeFilter');
  const [activeFilter, setActiveFilter] = useState(Number(activeTab) || 1);

  const { data, isLoading } = useGetProduct();
  const productData = data?.data;

  const { data: custodies, isLoading: isCustodyLoading } = useGetCustody();
  const activeCustodyData = custodies?.data?.activeCustody;
  const usedCustodyData = custodies?.data?.usedCustody;

  console.log(activeCustodyData, usedCustodyData);
  const { data: pointData, isLoading: isGetPointLoading } = useGetPoint();

  if (isLoading || isGetPointLoading || isCustodyLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full text-gray-black">
      <Header
        type="default"
        title="상점"
        icon={<MagnifyingGlassIcon width="24" height="24" fill="#1F1F1F" />}
      />

      <div className="flex justify-between px-6 mt-4 border-b border-gray-100">
        {PointShopFilter.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-center w-full text-he pb-[0.44rem] border-b hover:cursor-pointer transition-all duration-300 ease-out ${
              item.id === activeFilter
                ? 'border-gray-black text-black'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => setActiveFilter(item.id)}
          >
            {item.name}{' '}
            {item.id === 1
              ? productData?.length
              : activeCustodyData?.length + usedCustodyData?.length}
            개
          </div>
        ))}
      </div>

      {activeFilter === 1 ? (
        <div className="flex flex-col w-full gap-4 px-6 mt-4 overflow-y-scroll scrollbar-hide">
          <div className="flex items-center justify-start w-full h-12 gap-[0.62rem] bg-yellow-100 px-5 py-3 rounded-xl text-b3">
            <PointIcon />
            현재 보유 포인트 {pointData?.data?.totalPoint}P
          </div>

          <div className="grid grid-cols-4 gap-x-5 gap-y-5">
            {PointShopCategories.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-[0.31rem]"
              >
                <div className="flex items-center justify-center w-[3.25rem] h-[3.25rem] bg-gray-50 rounded-xl">
                  {item.Icon}
                </div>
                <div className="text-c2">{item.name}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-4">
            <span className="text-h3">상품 {productData?.length}개</span>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {productData?.map((item: ProductType, index: number) => (
                <Link key={index} href={`/point/shop/${item.id}`}>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="relative rounded-full w-[9.875rem] h-[9.875rem]">
                      <Image
                        src={item.imgURL}
                        alt={item.title}
                        width={158}
                        height={158}
                        className="object-cover object-top w-full h-full rounded-xl"
                      />
                    </div>

                    <div>
                      <div className="text-c1">{item.brand}</div>
                      <div className="text-h3">{item.price}P</div>
                      <div className="text-b3">{item.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4 mt-4 overflow-y-scroll scrollbar-hide">
          {/* <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] gap-4">
            <NothingItemIcon />
            <div className="text-gray-600 text-b1">
              구매한 기프티콘이 없어요
            </div>
            <button
              className="text-white bg-primary-default px-6 py-[0.62rem] rounded-lg"
              onClick={() => {
                setActiveCategory(1);
              }}
            >
              사러가기
            </button>
          </div> */}

          <div className="flex flex-col items-start justify-start w-full gap-4 px-6">
            <span className="text-h3">보유 {activeCustodyData?.length}개</span>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {activeCustodyData?.map((item: CustodyType, index: number) => (
                <div
                  className="flex flex-col items-start justify-start gap-2"
                  key={index}
                >
                  <div className="relative rounded-full w-[9.875rem] h-[9.875rem]">
                    <Image
                      src={item.product.imgURL}
                      alt={item.product.title}
                      width={158}
                      height={158}
                      className="object-cover object-top w-full h-full rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="text-c1">{item.product.brand}</div>
                    <div className="text-h3">{item.product.price}P</div>
                    <div className="text-b3">{item.product.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-2 min-h-2 bg-gray-50" />

          <div className="flex flex-col items-start justify-start w-full gap-4 px-6 scrollbar-hide">
            <span className="text-h3">
              사용완료 {usedCustodyData?.length}개
            </span>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {usedCustodyData?.map((item: CustodyType, index: number) => (
                <div
                  className="flex flex-col items-start justify-start gap-2"
                  key={index}
                >
                  <div className="relative rounded-full w-[9.875rem] h-[9.875rem]">
                    <Image
                      src={item.product.imgURL}
                      alt={item.product.title}
                      width={158}
                      height={158}
                      className="object-cover object-top w-full h-full rounded-xl"
                    />
                  </div>

                  <div>
                    <div className="text-c1">{item.product.brand}</div>
                    <div className="text-h3">{item.product.price}P</div>
                    <div className="text-b3">{item.product.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
