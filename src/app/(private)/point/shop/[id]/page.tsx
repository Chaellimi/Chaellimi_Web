'use client';

import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import { MagnifyingGlassIcon } from '@public/icons/shared';
import React from 'react';

const ShopDetail = () => {
  return (
    <div className="flex flex-col w-full h-full text-gray-black rounded-xl">
      <Header
        type="default"
        icon={<MagnifyingGlassIcon width="24" height="24" fill="#1F1F1F" />}
        backClick="/point/shop"
      />

      <div className="flex flex-col w-full gap-4 px-6 pb-[1.38rem] overflow-y-scroll scrollbar-hide">
        <div className="min-w-[20.5rem] min-h-[20.5rem] bg-black rounded-xl"></div>

        <div>
          <div className="text-c1">스타벅스</div>
          <div className="text-h3">2000P</div>
          <div className="text-b3">(ICE)아메리카노</div>
        </div>

        <div className="text-b1">상품설명</div>

        <span className="text-gray-400 text-b3">
          스타벅스의 깔끔한 맛을 자랑하는 커피로, 스타벅스 파트너들이 가장
          좋아하는 커피입니다. 이용안내 - 상기 이미지는 연출된 것으로 실제와
          다를 수 있습니다.- 본 상품은 매장 재고 상황에 따라 동일 상품으로
          교환이 불가능할 수 있습니다.- 동일 상품 교환이 불가한 경우 다른
          상품으로 교환이 가능합니다. (차액 발생 시 차액 지불) 만약 다른
          상품으로 교환을 원치 않을 경우 매장에서 환불 요청 접수가 가능하며,
          환불 요청 접수 시 카카오에서 쿠폰 수신자에게 환불 진행을 위한 알림톡을
          발송합니다.- 본 상품은 스타벅스 어플 홈 &gt; Coupon &gt; 모바일
          상품권에 추가해 편리하게 사용하실 수 있습니다.- 상품 결제 시 본 상품
          권면에 기재된 금액의 60% 이상을 결제한 후 남은 잔액은 회원의 계정에
          등록된 스타벅스 카드나 보유하고 있는 무기명 스타벅스 카드에
          충전됩니다. 스타벅스 카드를 등록 또는 보유하고 있지 않은 고객의 경우,
          무기명 스타벅스 카드를 발급받아 잔액을 충전할 수 있습니다. (일부 매장
          잔액 적립 불가)- 스타벅스 앱의 사이렌 오더를 통해서도 주문 및 결제가
          가능합니다. (일부 MD제외)- 미군부대 매장, 워터파크 입점 매장 등 일부
          매장에서는 사용이 불가합니다.- 정식 판매처 외의 장소나 경로를 통하여
          구매하거나, 기타의 방법으로 보유하신 쿠폰은 정상적인 사용 (환불,
          재전송 등 포함)이 금지되거나 제한될 수 있으니 주의하시기 바랍니다.-
          해당 쿠폰을 무단으로 가공하는 등의 행위는 관계 법령에 위반될 수
          있습니다.
        </span>
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
        <BottomButton title="참여하기" onClick={() => {}} disabled={'false'} />
      </div>
    </div>
  );
};

export default ShopDetail;
