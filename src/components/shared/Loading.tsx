'use client';

import { SpinLogo } from '@public/icons/shared';

interface LoadingProps {
  title?: string;
  subTitle?: string;
}

const Loading = ({ title = '', subTitle = '' }: LoadingProps) => {
  return (
    <div className="absolute top-0 left-0 z-[200] flex flex-col items-center justify-center w-full h-full gap-12 bg-white">
      <div className="text-h3">{title}</div>
      <div className="animate-spinSlow">
        <SpinLogo />
      </div>
      <div className="text-h3">{subTitle}</div>
    </div>
  );
};

export default Loading;
