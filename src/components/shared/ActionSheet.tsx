import React from 'react';

interface Ownprops {
  buttons: {
    icons: React.ReactNode;
    text: string;
    textColor?: string;
    onClick: () => void;
  }[];
}

const ActionSheet = ({ buttons }: Ownprops) => {
  return (
    <div className="py-[0.38rem] flex flex-col bg-gray-white rounded-xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] text-gray-black">
      {buttons.map((items, index) => (
        <div key={index} className="flex items-center px-4 py-2 gap-[0.62rem]">
          <div>{items.icons}</div>
          <div
            className={`${items.textColor ? `text-${items.textColor}` : 'text-gray-black'} text-bn3`}
          >
            {items.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionSheet;
