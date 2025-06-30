/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import {
  CameraIcon,
  ChangeCameraIcon,
  CloseIcon,
  GalleryIcon,
  ShapeQuestionIcon,
} from '@public/icons/Challenge/certification';
import React, { useRef, useState, useCallback } from 'react';

const Certification = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useStatusBarBridge({
    backgroundColor: 'black',
    translucent: true,
    bottomBackgroundColor: 'black',
  });

  // 카메라 시작
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('카메라 접근 오류:', err);
    }
  }, []);

  // 캡쳐
  const capture = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.save();
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.restore();

        const imageSrc = canvas.toDataURL('image/png');
        setImgSrc(imageSrc);
      }
    }
  }, []);

  // 컴포넌트 마운트 시 카메라 시작
  React.useEffect(() => {
    startCamera();

    const currentVideo = videoRef.current;

    return () => {
      if (currentVideo && currentVideo.srcObject) {
        const stream = currentVideo.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  const rectRatio = 0.85;
  const aspectRatio = 3 / 4;

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black custom601:w-[430px] custom601:pb-[100px] certification-video">
      {/* 상태바 영역 */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-12 pb-4 custom601:w-[430px] custom601:pb-6">
        {/* 닫기 버튼 */}
        <button className="flex items-center justify-center w-8 h-8">
          <CloseIcon />
        </button>

        {/* 제목 */}
        <h2 className="text-white text-h3">인증하기</h2>

        {/* 도움말 버튼 */}
        <button className="flex items-center justify-center w-8 h-8">
          <ShapeQuestionIcon />
        </button>
      </div>

      {/* 안내 텍스트 */}
      <p className="absolute z-20 w-full px-4 text-center text-white text-h3 top-32 drop-shadow-lg custom601:w-[430px] custom601:pb-6">
        카메라 영역에 맞춰 촬영해주세요
      </p>

      {/* 카메라 전체 프리뷰 */}
      <div className="absolute inset-0 w-full h-full custom601:w-[430px] custom601:pb-6">
        {!imgSrc ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="object-cover w-full h-full transform scale-x-[-1] custom601:pb-[100px]"
          />
        ) : (
          <img
            src={imgSrc}
            alt="captured"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* 블러 오버레이 */}
      {!imgSrc && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative flex items-center justify-center w-full h-full">
            {/* 중앙 촬영 사각형 */}
            <div
              className="absolute border-2 border-white shadow-lg rounded-2xl"
              style={{
                width: `${rectRatio * 100}vw`,
                height: `${(rectRatio * 100) / aspectRatio}vw`,
                top: `calc(50% - ${(rectRatio * 100) / aspectRatio / 2}vw)`,
                left: `calc(50% - ${(rectRatio * 100) / 2}vw)`,
              }}
            />
          </div>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 custom601:bottom-28">
        <div className="flex items-center justify-center px-8">
          {!imgSrc ? (
            <>
              {/* 갤러리 버튼 */}
              <button className="flex items-center justify-center w-12 h-12 mr-auto">
                <GalleryIcon />
              </button>

              {/* 촬영 버튼 */}
              <button
                onClick={capture}
                className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full shadow-lg"
              >
                <div className="flex items-center justify-center w-16 h-16 border-4 border-white rounded-full fill-[var(--primary-primary,#FF6A00)] shadow-[2px_2px_2px_0px_rgba(0,0,0,0.15)_inset,-2px_-2px_2px_0px_rgba(0,0,0,0.15)_inset]">
                  <CameraIcon />
                </div>
              </button>

              {/* 카메라 전환 버튼 */}
              <button className="flex items-center justify-center w-12 h-12 ml-auto">
                <ChangeCameraIcon />
              </button>
            </>
          ) : (
            <button className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg">
              인증 완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certification;
