'use client';

import Header from '@/components/shared/Header';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import { useState } from 'react';

// 간단한 아이콘 컴포넌트들
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<'service' | 'terms' | 'privacy'>(
    'service'
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useStatusBarBridge({
    backgroundColor: '#F7F7F7',
    translucent: true,
    bottomBackgroundColor: '#F7F7F7',
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const serviceContent = [
    {
      id: 'service1',
      title: '제1조 (목적)',
      content: [
        {
          article: '서비스 이용약관의 목적',
          text: '이 약관은 챌리미(이하 "회사"라 합니다)가 운영하는 챌리미 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.',
        },
      ],
    },
    {
      id: 'service2',
      title: '제2조 (정의)',
      content: [
        {
          article: '용어의 정의',
          text: '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.\n\n1. "서비스"라 함은 회사가 제공하는 챌린지 플랫폼 및 관련 서비스 일체를 의미합니다.\n2. "이용자"라 함은 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.\n3. "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.\n4. "비회원"이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.\n5. "챌린지"라 함은 서비스 내에서 이용자가 참여할 수 있는 다양한 활동 프로그램을 말합니다.\n6. "포인트"라 함은 서비스 이용에 따라 회사가 제공하는 가상의 결제수단을 말합니다.',
        },
      ],
    },
    {
      id: 'service3',
      title: '제3조 (약관의 효력 및 변경)',
      content: [
        {
          article: '약관의 효력 및 변경',
          text: '① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.\n② 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력이 발생합니다.\n③ 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원탈퇴를 할 수 있으며, 계속적인 서비스 이용은 약관의 변경사항에 동의한 것으로 간주됩니다.\n④ 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 회사에서 책임지지 않습니다.',
        },
      ],
    },
    {
      id: 'service4',
      title: '제4조 (회원가입)',
      content: [
        {
          article: '회원가입 절차',
          text: '① 이용자가 회원가입을 하고자 하는 경우 회사가 정한 양식에 따라 회원정보를 기입하고 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.\n② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.\n1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우\n2. 실명이 아니거나 타인의 명의를 이용한 경우\n3. 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우\n4. 만 14세 미만의 아동이 부모 등 법정대리인의 동의를 얻지 않은 경우\n5. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우',
        },
      ],
    },
    {
      id: 'service5',
      title: '제5조 (회원탈퇴 및 자격 상실)',
      content: [
        {
          article: '회원탈퇴 및 자격 상실',
          text: '① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.\n② 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.\n1. 가입 신청 시에 허위 내용을 등록한 경우\n2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우\n3. 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우\n③ 회사가 회원 자격을 제한·정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 회사는 회원자격을 상실시킬 수 있습니다.\n④ 회사가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.',
        },
      ],
    },
    {
      id: 'service6',
      title: '제6조 (서비스의 제공 및 변경)',
      content: [
        {
          article: '서비스의 제공 및 변경',
          text: '① 회사는 회원에게 아래와 같은 서비스를 제공합니다.\n1. 챌린지 생성 및 참여 서비스\n2. 인증 및 피드백 서비스\n3. 포인트 적립 및 사용 서비스\n4. 상품 구매 및 교환 서비스\n5. 커뮤니티 서비스\n6. 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스\n② 회사는 서비스의 품질 향상을 위해 서비스의 전부 또는 일부를 변경할 수 있으며, 이 경우 변경된 서비스의 내용 및 제공일자를 명시하여 현재의 서비스를 제공하는 화면에 게시합니다.\n③ 회사가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지합니다.',
        },
      ],
    },
    {
      id: 'service7',
      title: '제7조 (서비스의 중단)',
      content: [
        {
          article: '서비스의 중단',
          text: '① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.\n② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.\n③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 회사는 제8조에 정한 방법으로 이용자에게 통지하고 당초 회사에서 제시한 조건에 따라 소비자에게 보상합니다.',
        },
      ],
    },
    {
      id: 'service8',
      title: '제8조 (회원에 대한 통지)',
      content: [
        {
          article: '회원에 대한 통지',
          text: '① 회사가 회원에 대한 통지를 하는 경우, 회원이 회사와 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.\n② 회사는 불특정다수 회원에 대한 통지의 경우 1주일이상 서비스 화면에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.',
        },
      ],
    },
    {
      id: 'service9',
      title: '제9조 (이용자의 의무)',
      content: [
        {
          article: '이용자의 의무',
          text: '① 이용자는 다음 행위를 하여서는 안 됩니다.\n1. 신청 또는 변경시 허위 내용의 등록\n2. 타인의 정보 도용\n3. 회사에 게시된 정보의 변경\n4. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시\n5. 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해\n6. 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위\n7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위\n8. 회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위\n9. 기타 불법적이거나 부당한 행위\n② 이용자는 관계법령, 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.',
        },
      ],
    },
    {
      id: 'service10',
      title: '제10조 (개인정보보호)',
      content: [
        {
          article: '개인정보보호',
          text: '① 회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.\n② 회사는 회원가입시 서비스 제공에 필요한 정보를 미리 수집하지 않습니다.\n③ 회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.\n④ 회사는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.\n⑤ 회사는 이용자의 개인정보를 보호하기 위하여 개인정보처리방침을 수립하고 공개합니다.',
        },
      ],
    },
    {
      id: 'service11',
      title: '제11조 (회사의 의무)',
      content: [
        {
          article: '회사의 의무',
          text: '① 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는데 최선을 다하여야 합니다.\n② 회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 구축하여야 합니다.\n③ 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다.\n④ 회사는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.',
        },
      ],
    },
    {
      id: 'service12',
      title: '제12조 (저작권의 귀속 및 이용제한)',
      content: [
        {
          article: '저작권의 귀속 및 이용제한',
          text: '① 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.\n② 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.\n③ 회사는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통지하여야 합니다.',
        },
      ],
    },
    {
      id: 'service13',
      title: '제13조 (분쟁해결)',
      content: [
        {
          article: '분쟁해결',
          text: '① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.\n② 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.\n③ 회사와 이용자 간에 발생한 분쟁은 전자거래조정위원회 또는 방송통신위원회의 조정에 따를 수 있습니다.',
        },
      ],
    },
  ];

  const termsContent = [
    {
      id: 'chapter1',
      title: '제1장 총칙',
      content: [
        {
          article: '제1조 (목적)',
          text: '이 약관은 챌리미(전자상거래 사업자)가 운영하는 챌리미 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.',
        },
        {
          article: '제2조 (정의)',
          text: '① "몰"이란 챌리미가 재화 또는 용역(이하 "재화 등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.\n② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.\n③ "회원"이란 "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.',
        },
        {
          article: '제3조 (약관 등의 명시와 설명 및 개정)',
          text: '① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 "몰"의 초기 서비스화면(전면)에 게시합니다.\n② "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.',
        },
      ],
    },
    {
      id: 'chapter2',
      title: '제2장 회원가입',
      content: [
        {
          article: '제4조 (서비스의 제공 및 변경)',
          text: '① "몰"은 다음과 같은 업무를 수행합니다.\n1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결\n2. 구매계약이 체결된 재화 또는 용역의 배송\n3. 기타 "몰"이 정하는 업무\n② "몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.',
        },
        {
          article: '제5조 (회원가입)',
          text: '① 이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.\n② "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.\n1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우\n2. 등록 내용에 허위, 기재누락, 오기가 있는 경우\n3. 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우',
        },
      ],
    },
    {
      id: 'chapter3',
      title: '제3장 계약의 성립',
      content: [
        {
          article: '제6조 (구매신청 및 개인정보 제공 동의 등)',
          text: '① "몰"이용자는 "몰"상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, "몰"은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.\n1. 재화 등의 검색 및 선택\n2. 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력\n3. 약관내용, 청약철회권이 제한되는 서비스, 배송료·설치비 등의 비용부담과 관련한 내용에 대한 확인\n4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시\n5. 재화등의 구매신청 및 이에 관한 확인 또는 "몰"의 확인에 대한 동의\n6. 결제방법의 선택',
        },
        {
          article: '제7조 (계약의 성립)',
          text: '① "몰"은 제6조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다.\n1. 신청 내용에 허위, 기재누락, 오기가 있는 경우\n2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우\n3. 기타 구매신청에 승낙하는 것이 "몰" 기술상 현저히 지장이 있다고 판단하는 경우',
        },
      ],
    },
    {
      id: 'chapter4',
      title: '제4장 서비스 이용 및 제한',
      content: [
        {
          article: '제8조 (결제방법)',
          text: '"몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다. 단, "몰"은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.\n1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체\n2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제\n3. 온라인무통장입금\n4. 전자화폐에 의한 결제\n5. 수령 시 대금지급\n6. 마일리지 등 "몰"이 지급한 포인트에 의한 결제\n7. "몰"과 계약을 맺었거나 "몰"이 인정한 상품권에 의한 결제\n8. 기타 전자적 지급 방법에 의한 대금지급 등',
        },
        {
          article: '제9조 (수령확인·구매신청 변경 및 취소)',
          text: '① "몰"은 이용자의 구매신청이 있는 경우 이용자에게 수령확인 통지를 합니다.\n② 수령확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수령확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 "몰"은 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다.',
        },
      ],
    },
    {
      id: 'chapter5',
      title: '제5장 청약철회 등',
      content: [
        {
          article: '제10조 (청약철회 등)',
          text: '① "몰"과 구매계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다.\n② 이용자는 재화 등을 배송받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.\n1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우\n2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우\n3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우\n4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우',
        },
      ],
    },
    {
      id: 'chapter6',
      title: '제6장 기타',
      content: [
        {
          article: '제11조 (개인정보보호)',
          text: '① "몰"은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.\n② "몰"은 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.\n③ "몰"은 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.',
        },
        {
          article: '제12조 (분쟁해결)',
          text: '① "몰"은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.\n② "몰"은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.\n③ "몰"과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.',
        },
      ],
    },
  ];

  const privacyContent = [
    {
      id: 'privacy1',
      title: '제1조 (개인정보의 처리목적)',
      content: [
        {
          article: '개인정보 처리 목적',
          text: '챌리미는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n\n1. 회원 가입 및 관리\n회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보처리 시 법정대리인의 동의여부 확인, 각종 고지․통지, 고충처리 목적으로 개인정보를 처리합니다.\n\n2. 재화 또는 서비스 제공\n물품배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제․정산, 채권추심 목적으로 개인정보를 처리합니다.\n\n3. 고충처리\n민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리결과 통보 목적으로 개인정보를 처리합니다.',
        },
      ],
    },
    {
      id: 'privacy2',
      title: '제2조 (개인정보의 처리 및 보유기간)',
      content: [
        {
          article: '개인정보 처리 및 보유기간',
          text: '① 챌리미는 법령에 따른 개인정보 보유․이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.\n\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n\n1. 회원 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지\n다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지\n- 관계 법령 위반에 따른 수사․조사 등이 진행중인 경우에는 해당 수사․조사 종료시까지\n- 서비스 이용에 따른 채권․채무관계 잔존시에는 해당 채권․채무관계 정산시까지\n\n2. 재화 또는 서비스 제공 : 재화․서비스 공급완료 및 요금결제․정산 완료시까지\n다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지\n- 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 보관의무\n  · 계약 또는 청약철회 등에 관한 기록 : 5년\n  · 대금결제 및 재화 등의 공급에 관한 기록 : 5년\n  · 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년\n  · 표시․광고에 관한 기록 : 6개월',
        },
      ],
    },
    {
      id: 'privacy3',
      title: '제3조 (개인정보의 제3자 제공)',
      content: [
        {
          article: '개인정보의 제3자 제공',
          text: '① 챌리미는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n\n② 챌리미는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.\n\n1. 결제서비스 제공업체\n- 개인정보를 제공받는 자 : KG이니시스, 토스페이먼츠\n- 제공받는 자의 개인정보 이용목적 : 결제서비스 제공\n- 제공받는 자의 보유․이용기간 : 거래 완료 후 5년\n\n2. 배송업체\n- 개인정보를 제공받는 자 : CJ대한통운, 한진택배, 로젠택배\n- 제공받는 자의 개인정보 이용목적 : 상품배송\n- 제공받는 자의 보유․이용기간 : 배송완료 후 즉시 파기',
        },
      ],
    },
    {
      id: 'privacy4',
      title: '제4조 (개인정보처리의 위탁)',
      content: [
        {
          article: '개인정보처리의 위탁',
          text: '① 챌리미는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n\n1. 클라우드 서비스\n- 위탁받는 자 (수탁자) : Amazon Web Services Korea LLC\n- 위탁하는 업무의 내용 : 클라우드 서비스 제공, 데이터 보관\n- 위탁기간 : 서비스 이용 계약 기간\n\n2. 고객상담 서비스\n- 위탁받는 자 (수탁자) : ㈜채널톡\n- 위탁하는 업무의 내용 : 고객상담 및 불만처리\n- 위탁기간 : 서비스 이용 계약 기간\n\n② 챌리미는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.',
        },
      ],
    },
    {
      id: 'privacy5',
      title: '제5조 (정보주체의 권리·의무 및 행사방법)',
      content: [
        {
          article: '정보주체의 권리·의무 및 행사방법',
          text: '① 정보주체는 챌리미에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.\n\n1. 개인정보 처리현황 통지요구\n2. 개인정보 열람요구\n3. 개인정보 정정·삭제요구\n4. 개인정보 처리정지요구\n\n② 제1항에 따른 권리 행사는 챌리미에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 챌리미는 이에 대해 지체없이 조치하겠습니다.\n\n③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.\n\n④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.\n\n⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.',
        },
      ],
    },
    {
      id: 'privacy6',
      title: '제6조 (개인정보의 안전성 확보조치)',
      content: [
        {
          article: '개인정보의 안전성 확보조치',
          text: '챌리미는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.\n\n1. 정기적인 자체 감사 실시\n개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.\n\n2. 개인정보 취급 직원의 최소화 및 교육\n개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.\n\n3. 내부관리계획의 수립 및 시행\n개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.\n\n4. 해킹 등에 대비한 기술적 대책\n해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.\n\n5. 개인정보의 암호화\n이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.',
        },
      ],
    },
    {
      id: 'privacy7',
      title: '제7조 (개인정보 보호책임자)',
      content: [
        {
          article: '개인정보 보호책임자',
          text: '① 챌리미는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n\n▶ 개인정보 보호책임자\n성명 : 김챌리미\n직책 : 개인정보보호담당\n직급 : 팀장\n연락처 : 02-1234-5678, privacy@chaellimi.com\n\n② 정보주체께서는 챌리미의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 챌리미는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.\n\n③ 개인정보 보호와 관련하여 기타 자세한 사항은 개인정보보호위원회 개인정보포털(privacy.go.kr)을 참고하시기 바랍니다.',
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <Header type="default" title="약관 및 정책" backClick="/profile" />

      {/* Tabs */}
      <div className="h-full max-w-4xl px-4 pt-4 overflow-y-auto scrollbar-hide">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex px-6 space-x-8 overflow-x-scroll scrollbar-hide">
              <button
                onClick={() => setActiveTab('service')}
                className={`py-4 px-1 border-b-2 font-medium text-sm min-w-fit ${
                  activeTab === 'service'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                이용약관
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`py-4 px-1 border-b-2 font-medium text-sm min-w-fit ${
                  activeTab === 'terms'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                전자상거래 표준약관
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`py-4 px-1 border-b-2 font-medium text-sm min-w-fit ${
                  activeTab === 'privacy'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                개인정보처리방침
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'service' ? (
              <div className="space-y-6">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    서비스 이용약관
                  </h2>
                  <p className="text-gray-600">시행일자: 2025년 1월 1일</p>
                </div>

                {serviceContent.map((section) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-900 rounded-t-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <span>{section.title}</span>
                      {expandedSection === section.id ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === section.id && (
                      <div className="px-4 py-3 space-y-4">
                        {section.content.map((item, index) => (
                          <div
                            key={index}
                            className="pl-4 border-l-4 border-purple-200"
                          >
                            <h4 className="mb-2 font-medium text-gray-900">
                              {item.article}
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : activeTab === 'terms' ? (
              <div className="space-y-6">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    전자상거래(인터넷사이버몰) 표준약관
                  </h2>
                  <p className="text-gray-600">시행일자: 2025년 1월 1일</p>
                </div>

                {termsContent.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => toggleSection(chapter.id)}
                      className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-900 rounded-t-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <span>{chapter.title}</span>
                      {expandedSection === chapter.id ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === chapter.id && (
                      <div className="px-4 py-3 space-y-4">
                        {chapter.content.map((item, index) => (
                          <div
                            key={index}
                            className="pl-4 border-l-4 border-blue-200"
                          >
                            <h4 className="mb-2 font-medium text-gray-900">
                              {item.article}
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    개인정보처리방침
                  </h2>
                  <p className="text-gray-600">시행일자: 2025년 1월 1일</p>
                </div>

                {privacyContent.map((section) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-900 rounded-t-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <span>{section.title}</span>
                      {expandedSection === section.id ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === section.id && (
                      <div className="px-4 py-3 space-y-4">
                        {section.content.map((item, index) => (
                          <div
                            key={index}
                            className="pl-4 border-l-4 border-green-200"
                          >
                            <h4 className="mb-2 font-medium text-gray-900">
                              {item.article}
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 mb-24">
          <div className="text-sm text-center text-gray-500">
            <p>
              본 약관 및 개인정보처리방침에 대한 문의사항이 있으시면 아래
              연락처로 문의해 주세요.
            </p>
            <p className="mt-2">
              <strong className="ml-2">이메일 :</strong> dltmdgus1412@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
