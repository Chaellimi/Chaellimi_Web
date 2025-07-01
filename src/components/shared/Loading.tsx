'use client';

import { SpinLogo } from '@public/icons/shared';

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white animate-spinSlow">
      <SpinLogo />
    </div>
  );
};

export default Loading;
