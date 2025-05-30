import React from 'react';

interface OwnProps {
  location?: 'right' | 'left' | 'up' | 'down';
  width?: string;
  height?: string;
  fill?: string;
}

const ArrowIcon = ({ location = 'right', width, height, fill }: OwnProps) => {
  const getRotation = () => {
    switch (location) {
      case 'left':
        return 'rotate(180deg)';
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      default:
        return 'rotate(0)';
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '24'}
      height={height ? height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: getRotation() }}
    >
      <path
        d="M8.8637 4.86346C8.51223 5.21493 8.51223 5.78478 8.8637 6.13625L14.7273 11.9999L8.8637 17.8635C8.51223 18.2149 8.51223 18.7848 8.8637 19.1362C9.21517 19.4877 9.78502 19.4877 10.1365 19.1362L16.6365 12.6362C16.988 12.2848 16.988 11.7149 16.6365 11.3635L10.1365 4.86346C9.78502 4.51199 9.21517 4.51199 8.8637 4.86346Z"
        fill={`${fill ? fill : '#C9C9C9'}`}
      />
    </svg>
  );
};

export default ArrowIcon;
