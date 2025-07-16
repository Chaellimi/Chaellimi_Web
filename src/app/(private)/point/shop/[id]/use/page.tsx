'use client';

import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import SelectModal from '@/components/shared/SelectModal';
import { formatDateToDot } from '@/lib/utils/formatDateToDot';
import { usePostUseCustody } from '@/service/Shop/shop.mutation';
import { useGetCustodyById } from '@/service/Shop/shop.query';
import { MagnifyingGlassIcon } from '@public/icons/shared';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const UseCoupon = () => {
  const router = useRouter();
  const custodyId = useSearchParams().get('custodyId');

  const [isOpenUseModal, setIsOpenUseModal] = React.useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = React.useState(false);

  const { data, isLoading } = useGetCustodyById(custodyId || '');
  const custodyData = data?.data?.custody;
  const isUsed = data?.data?.isUsed;

  const { mutate, isPending } = usePostUseCustody(custodyId || '');
  const handleUseProduct = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsOpenConfirmModal(false);
        setIsOpenUseModal(false);
        router.push(`/point/shop?activeFilter=2`);
      },
    });
  };

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-full text-gray-black rounded-xl">
      <Header
        type="default"
        icon={<MagnifyingGlassIcon width="24" height="24" fill="#1F1F1F" />}
        backClick="/point/shop?activeFilter=2"
      />

      <div className="relative flex flex-col justify-between pb-[1.38rem] overflow-y-scroll scrollbar-hide w-full">
        <div className="flex flex-col w-full gap-4">
          <div className="relative rounded-full h-[20.5rem] w-[20.5rem] min-w-[20.5rem] px-6">
            <div className="relative w-[328px] h-[328px] mx-auto">
              <Image
                src={custodyData?.product?.imgURL}
                alt={custodyData?.product?.title}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>
          </div>

          <div className="px-6">
            <div className="text-c1">{custodyData?.product?.brand}</div>
            <div className="text-h3">{custodyData?.product?.price}P</div>
            <div className="text-b3">{custodyData?.product?.title}</div>
          </div>

          <div className="w-full h-2 bg-gray-50" />

          <div className="flex justify-between w-full px-6">
            <div className="text-b2">구매일</div>
            <div className="text-gray-500 text-b3">
              {formatDateToDot(custodyData?.createdAt)}
            </div>
          </div>

          <div className="flex justify-between w-full px-6">
            <div className="text-b2">유효기간</div>
            <div className="text-gray-500 text-b3">
              {formatDateToDot(custodyData?.inventory?.expiration)}
            </div>
          </div>

          <div className="w-full h-2 bg-gray-50" />

          <div className="px-6 text-b1">상품설명</div>

          <div className="px-6 text-gray-400 whitespace-pre-line text-b3">
            {custodyData?.product?.explanation}
          </div>
        </div>

        <div className="fixed bottom-0 flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
          {isUsed ? (
            <BottomButton
              title="사용 완료"
              onClick={() => {}}
              disabled={'true'}
            />
          ) : (
            <BottomButton
              title="사용하기"
              onClick={() => {
                setIsOpenUseModal(true);
              }}
              disabled={'false'}
            />
          )}
        </div>
      </div>

      {isOpenConfirmModal && (
        <SelectModal
          title="상품을 사용 처리하시겠습니까?"
          description="확인 후 취소가 불가능합니다."
          cancel={() => {
            setIsOpenConfirmModal(false);
          }}
          confirm={handleUseProduct}
        />
      )}

      {isOpenUseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 z-10 bg-black/30"
            onClick={() => {
              setIsOpenUseModal(false);
              setIsOpenConfirmModal(true);
            }}
          />

          <div className="z-20 flex flex-col items-center justify-center w-full gap-4 py-10 bg-white rounded-2xl">
            <div className="relative w-[150px] h-[150px] mx-auto">
              <Image
                src={custodyData?.product?.imgURL}
                alt={custodyData?.product?.title}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-b3">
                {custodyData?.product?.brand}
              </div>
              <div className="text-black text-b1">
                {custodyData?.product?.title}
              </div>
            </div>

            <div className="relative w-[140px] h-[55px] mx-auto">
              <Image
                src={custodyData?.inventory?.imgURL}
                alt={custodyData?.product?.title}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="text-gray-500 text-b3">
              {formatDateToDot(custodyData?.inventory?.expiration)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCoupon;
