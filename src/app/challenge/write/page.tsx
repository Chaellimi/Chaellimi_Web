import Header from '@/components/shared/Header';
import { CancelIcon } from '@public/icons/Challenge/write';
import React from 'react';

const Write = () => {
  return (
    <div>
      <Header type="default" title="챌린지 생성" backIcon={<CancelIcon />} />
    </div>
  );
};

export default Write;
