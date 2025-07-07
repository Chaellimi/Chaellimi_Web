/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useUploadImg } from '@/service/shared/shared.mutation';
import {
  WrongMarkIcon,
  WrongXIcon,
} from '@public/icons/Challenge/certification';
import ShapeQuestion from '@public/icons/Challenge/certification/shapeQuestion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EXIF from 'exif-js';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import PathUtil from '@/lib/utils/pathUtil';
import isWebEnvironment from '@/lib/utils/isWebEnvironment';

const WrongCertificationExample = [
  {
    src: '/images/WrongCertification1.png',
    alt: '인증불가 사진 예시 1',
  },
  {
    src: '/images/WrongCertification2.jpg',
    alt: '인증불가 사진 예시 2',
  },
  {
    src: '/images/WrongCertification3.jpg',
    alt: '인증불가 사진 예시 3',
  },
];

const Certification = () => {
  const router = useRouter();
  const path = usePathname();
  const challengeId = PathUtil(path, 1);

  useStatusBarBridge({
    backgroundColor: '#FFF',
    translucent: true,
    bottomBackgroundColor: '#FFF',
  });

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  console.log(imgSrc);

  const base64ToBlob = (base64: string): Blob => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const { mutateAsync: uploadImage, isPending } = useUploadImg();

  // 네이티브 카메라 요청
  const handleNativeCamera = () => {
    if (isWebEnvironment()) {
      return alert('웹 환경에서는 인증 기능을 사용할 수 없습니다.');
    } else {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: 'OPEN_CAMERA' })
      );
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data.type === 'CAMERA_RESULT' && data.payload?.base64) {
          const base64 = data.payload.base64;
          const imageBlob = base64ToBlob(base64);

          const exif = data.payload.exif;
          if (exif && exif.DateTimeOriginal) {
            sessionStorage.setItem('cert-taken-time', exif.DateTimeOriginal);
          } else {
            const file = new File([imageBlob], 'certification.jpg', {
              type: 'image/jpeg',
            });

            EXIF.getData(file as any, function (this: any) {
              const date = EXIF.getTag(this, 'DateTimeOriginal');
              if (date) {
                const formatted = date.replace(
                  /^(\d{4}):(\d{2}):(\d{2})/,
                  '$1-$2-$3'
                );
                sessionStorage.setItem('cert-taken-time', formatted);
              } else {
                sessionStorage.removeItem('cert-taken-time');
              }
            });
          }

          const formData = new FormData();
          formData.append('image', imageBlob, 'certification.png');

          setImgSrc(base64);

          uploadImage(formData)
            .then((result) => {
              const fileUrl = result.data.fileUrl;
              if (fileUrl) {
                router.push(
                  `/challenge/${challengeId}/certification/done?image=${fileUrl}`
                );
              }
            })
            .catch((err) => {
              console.error('업로드 에러:', err);
            });
        }
      } catch (err) {
        console.error('WebView 메시지 파싱 오류:', err);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router, uploadImage, challengeId]);

  if (isPending) {
    return <Loading subTitle="사진업로드 중입니다..." />;
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <Header
        type="default"
        title="인증하기"
        icon={<ShapeQuestion color="#000" />}
      />

      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-4">
            <div className="text-h3">인증 방법 안내</div>

            <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-xl">
              <div className="text-fn">인증 시 유의사항</div>
              <ul className="text-gray-400 text-c1">
                <li>- 실제 활동 모습이 보이도록 촬영해 주세요.</li>
                <li>- 챌린지 주제와 관련된 물품/공간이 포함되면 좋아요.</li>
                <li>
                  - 같은 사진 반복 사용 시 포인트 지급이 제한될 수 있어요.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-[0.62rem]">
            <div className="flex items-center gap-1">
              <WrongMarkIcon />
              <div className="text-b3">
                이런 사진은 포인트 지급이 제한될 수 있어요
              </div>
            </div>

            <div className="flex gap-[0.62rem] overflow-x-scroll scrollbar-hide">
              {WrongCertificationExample.map((item) => (
                <div className="flex flex-col gap-[0.62rem]" key={item.alt}>
                  <div className="relative w-[280px] h-[280px]">
                    <Image
                      src={item.src}
                      width={280}
                      height={280}
                      alt={item.alt}
                      className="object-cover object-top w-full h-full rounded-2xl"
                    />
                  </div>
                  <div className="flex items-center">
                    <WrongXIcon />
                    <div>챌린지 내용과 무관한 사진</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
          <BottomButton
            title="촬영 시작하기"
            onClick={handleNativeCamera}
            disabled="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Certification;
