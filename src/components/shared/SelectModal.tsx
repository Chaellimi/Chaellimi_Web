'use client';

import React, { useEffect } from 'react';

interface OwnPorps {
  title: string;
  description: string;
  cancel?: () => void;
  confirm?: () => void;
}

const SelectModal = ({ title, description, cancel, confirm }: OwnPorps) => {
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'SET_STATUS_BAR',
        payload: {
          backgroundColor: '#0000004D',
          translucent: true,
          bottomBackgroundColor: '#0000004D',
        },
      })
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 z-10 bg-black/30" />

      <div className="z-20 bg-white rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 p-10 rounded-t-2xl">
          <div className="text-h3">{title}</div>
          <div className="text-gray-500 text-b3">{description}</div>
        </div>

        <div className="flex w-full h-[3.6875rem]">
          {cancel && (
            <button
              className={`w-full h-full px-14 text-gray-500 bg-white border-r border-gray-200 rounded-bl-2xl ${!confirm ? 'rounded-br-2xl' : ''}`}
              onClick={cancel}
            >
              취소
            </button>
          )}
          {confirm && (
            <button
              className={`w-full h-full px-14 text-white bg-primary-default text-bn2 rounded-br-2xl ${!cancel ? 'rounded-bl-2xl' : ''}`}
              onClick={confirm}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
