'use client';

import BottomButton from '@/components/shared/BottomButton';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import Image from 'next/image';
import FinishCheckImage from '@public/images/FinishCheckImage.png';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PathUtil from '@/lib/utils/pathUtil';

const BuySuccess = () => {
  const router = useRouter();
  const path = usePathname();
  const imageURL = useSearchParams().get('image');
  const shopId = PathUtil(path, 2);

  useStatusBarBridge({
    backgroundColor: '#FFF',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  return (
    <div className="flex flex-col w-full h-full px-6">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div>
          <Image src={FinishCheckImage} width={90} alt="" />
        </div>

        <div className="flex flex-col items-center justify-center gap-[0.31rem]">
          <div className="text-h1 text-gray-black">구매 완료!</div>
          <div className="text-gray-500 text-b3">
            보관함에서 구매한 상품을 확인할 수 있어요.
          </div>
        </div>

        <div className="relative rounded-full w-[9.875rem] h-[9.875rem]">
          {imageURL ? (
            <Image
              src={imageURL}
              alt="구매한 상품 이미지"
              width={158}
              height={158}
              className="object-cover object-top w-full h-full rounded-xl"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-xl">
              이미지가 없음
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-[0.62rem] px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
        <button
          className="flex items-center justify-center h-full px-6 bg-gray-100 min-w-fit rounded-xl"
          onClick={() => {
            router.push(`/point/shop/${shopId}`);
          }}
        >
          이전
        </button>
        <BottomButton
          title="보관함가기"
          onClick={() => {
            router.push('/point/shop?activeFilter=2');
          }}
          disabled="false"
        />
      </div>
    </div>
  );
};

export default BuySuccess;
