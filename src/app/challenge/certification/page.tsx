/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { CameraIcon } from '@public/icons/Challenge/certification';
import React, { useRef, useState, useCallback } from 'react';

const Certification = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

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
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black">
      {/* 상태바 영역 */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-12 pb-4">
        {/* 닫기 버튼 */}
        <button className="flex items-center justify-center w-8 h-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 제목 */}
        <h2 className="text-lg font-semibold text-white">인증하기</h2>

        {/* 도움말 버튼 */}
        <button className="flex items-center justify-center w-8 h-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <path
              d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 17h.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* 안내 텍스트 */}
      <p className="absolute z-20 w-full px-4 text-base text-center text-white top-32 drop-shadow-lg">
        카메라 영역에 맞춰 촬영해주세요
      </p>

      {/* 카메라 전체 프리뷰 */}
      <div className="absolute inset-0 w-full h-full">
        {!imgSrc ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="object-cover w-full h-full transform scale-x-[-1]"
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
            {/* 위쪽 블러 */}
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: `calc(50vh - ${(rectRatio * 100) / aspectRatio / 2}vw)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.3)',
              }}
            />
            {/* 아래쪽 블러 */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: `calc(50vh - ${(rectRatio * 100) / aspectRatio / 2}vw)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.3)',
              }}
            />
            {/* 좌측 블러 */}
            <div
              className="absolute top-[21.1%] left-0 h-[57.8%]"
              style={{
                width: `calc(50vw - ${(rectRatio * 100) / 2}vw)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.3)',
              }}
            />
            {/* 우측 블러 */}
            <div
              className="absolute top-[21.1%] right-0 h-[57.8%]"
              style={{
                width: `calc(50vw - ${(rectRatio * 100) / 2}vw)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      )}

      {/* 다시 찍기 버튼 */}
      {imgSrc && (
        <button
          onClick={() => setImgSrc(null)}
          className="absolute z-30 px-4 py-2 text-sm font-medium text-black bg-white rounded-full shadow-lg top-32 right-6"
        >
          다시찍기
        </button>
      )}

      {/* 하단 버튼 영역 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
        <div className="flex items-center justify-center px-8">
          {!imgSrc ? (
            <>
              {/* 갤러리 버튼 */}
              <button className="flex items-center justify-center w-12 h-12 mr-auto">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="2" />
                </svg>
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
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 8l4 4-4 4M7 16l-4-4 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 12H3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
