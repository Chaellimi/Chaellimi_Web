'use client';

import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import SelectModal from '@/components/shared/SelectModal';
import PathUtil from '@/lib/utils/pathUtil';
import { useGetPoint } from '@/service/Point/point.query';
import { usePostBuyProduct } from '@/service/Shop/shop.mutation';
import { useGetProductById } from '@/service/Shop/shop.query';
import { MagnifyingGlassIcon } from '@public/icons/shared';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const ShopDetail = () => {
  const router = useRouter();
  const path = usePathname();
  const productId = PathUtil(path, 2);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = React.useState(false);

  const { data, isLoading } = useGetProductById(String(productId));
  const productData = data?.data?.product;
  const availableStock = data?.data?.inventory?.availableStock;

  const { data: pointData, isLoading: isGetPointLoading } = useGetPoint();
  const totalPoint = pointData?.data?.totalPoint;

  const { mutate } = usePostBuyProduct(String(productId));
  const handlePurchase = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsOpenConfirmModal(false);
        router.push(
          `/point/shop/${productId}/success?image=${productData.imgURL}`
        );
      },
    });
  };

  const isEnoughPoint = totalPoint - productData?.price >= 0;

  if (isLoading || isGetPointLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full text-gray-black rounded-xl">
      <Header
        type="default"
        icon={<MagnifyingGlassIcon width="24" height="24" fill="#1F1F1F" />}
        backClick="/point/shop"
      />

      <div className="relative flex flex-col justify-between pb-[1.38rem] overflow-y-scroll scrollbar-hide w-full">
        <div className="flex flex-col w-full gap-4 px-6">
          <div className="relative rounded-full min-h-[20.5rem] max-h-[20.5rem] min-w[20.5rem] max-w-[20.5rem]">
            <div className="relative w-[328px] h-[328px] mx-auto">
              <Image
                src={productData?.imgURL}
                alt={productData?.title}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>
          </div>

          <div>
            <div className="text-c1">{productData?.brand}</div>
            <div className="text-h3">{productData?.price}P</div>
            <div className="text-b3">{productData?.title}</div>
          </div>

          <div className="text-b1">상품설명</div>

          <div className="text-gray-400 whitespace-pre-line text-b3">
            {productData?.explanation}
          </div>
        </div>

        <div className="fixed bottom-0 flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
          {availableStock > 0 ? (
            <BottomButton
              title="구매하기"
              onClick={() => {
                setIsOpenConfirmModal(true);
              }}
              disabled={'false'}
            />
          ) : (
            <BottomButton
              title="재고 없음"
              onClick={() => {}}
              disabled={'true'}
            />
          )}
        </div>
      </div>

      {isOpenConfirmModal ? (
        isEnoughPoint ? (
          <SelectModal
            title="상품을 구매하시겠습니까?"
            description="구매 후 취소가 불가능합니다."
            cancel={() => {
              setIsOpenConfirmModal(false);
            }}
            confirm={handlePurchase}
            usePoint={productData?.price}
            totalPoint={totalPoint - productData?.price}
          />
        ) : (
          <SelectModal
            title="상품을 구매할 수 없습니다."
            description="포인트가 부족합니다."
            cancel={() => {
              setIsOpenConfirmModal(false);
            }}
            usePoint={productData?.price}
            totalPoint={totalPoint - productData?.price}
          />
        )
      ) : null}
    </div>
  );
};

export default ShopDetail;
