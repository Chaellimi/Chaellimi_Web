import React from 'react';

interface OwnProps {
  title: string;
  onClick: () => void;
  disabled: 'true' | 'false' | 'progress';
}

const BottomButton = ({ title, onClick, disabled }: OwnProps) => {
  return (
    <button
      className={`flex items-center justify-center w-full h-[3.25rem] min-h-[3.25rem] rounded-xl text-bn1
        ${
          disabled === 'true'
            ? 'bg-gray-100 text-gray-600'
            : disabled === 'false'
              ? 'bg-primary-default text-gray-white'
              : disabled === 'progress'
                ? 'bg-primary-default text-gray-white'
                : null
        }`}
      onClick={onClick}
      disabled={disabled !== 'false' && disabled !== 'progress'}
    >
      {disabled === 'progress' ? '진행중' : title}
    </button>
  );
};

export default BottomButton;
