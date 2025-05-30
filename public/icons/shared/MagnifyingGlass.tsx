import React from 'react';

interface OwnProps {
  fill: string;
  width?: string;
  height?: string;
}

const MagnifyingGlassIcon = ({ fill, width, height }: OwnProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '20'}
      height={height ? height : '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33331 1.75C4.69745 1.75 1.75 4.69746 1.75 8.33333C1.75 11.9692 4.69745 14.9167 8.33331 14.9167C9.88105 14.9167 11.3041 14.3826 12.428 13.4886L16.5531 17.6136C16.846 17.9065 17.3208 17.9065 17.6137 17.6136C17.9066 17.3207 17.9066 16.8459 17.6137 16.553L13.4887 12.4279C14.3826 11.3039 14.9166 9.88101 14.9166 8.33333C14.9166 4.69746 11.9692 1.75 8.33331 1.75ZM3.24999 8.33333C3.24999 5.52589 5.52587 3.25 8.33331 3.25C11.1407 3.25 13.4166 5.52589 13.4166 8.33333C13.4166 11.1408 11.1407 13.4167 8.33331 13.4167C5.52587 13.4167 3.24999 11.1408 3.24999 8.33333Z"
        fill={fill}
      />
    </svg>
  );
};

export default MagnifyingGlassIcon;
