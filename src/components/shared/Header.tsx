import { BackArrowIcon } from '@public/icons/shared';
import React from 'react';
import TextLogo from './TextLogo';

interface OwnProps {
  type: 'default' | 'search' | 'progress' | 'logo' | 'title';
  backClick?: () => void;
  icon?: React.ReactNode;
  iconClick?: () => void;
  icon2?: React.ReactNode;
  iconClick2?: () => void;
  title?: string;
  progress?: number;
}

const Header = ({
  type,
  backClick,
  icon,
  iconClick,
  icon2,
  iconClick2,
  title,
  progress,
}: OwnProps) => {
  return (
    <>
      {type === 'default' && (
        <header className="flex items-center justify-between w-full py-[0.59rem] h-12 px-6">
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          <div className="flex items-center gap-2">
            {icon && <div onClick={iconClick}>{icon}</div>}
            {icon2 && <div onClick={iconClick2}>{icon2}</div>}
          </div>
        </header>
      )}
      {type === 'search' && (
        <header className="flex items-center justify-between w-full py-[0.59rem] h-12 px-6">
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          <div className="flex items-center gap-2">
            <input type="text" />
          </div>
        </header>
      )}
      {type === 'progress' && (
        <header className="flex items-center justify-between w-full h-12 px-6">
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          <div className="flex items-center gap-2">{progress}</div>
          <div className="flex items-center gap-2">
            {icon && <div onClick={iconClick}>{icon}</div>}
            {icon2 && <div onClick={iconClick2}>{icon2}</div>}
          </div>
        </header>
      )}
      {type === 'logo' && (
        <header className="flex items-center justify-between w-full h-12 px-7">
          <div>
            <TextLogo width={75} />
          </div>
          <div className="flex items-center gap-2">
            {icon && <div onClick={iconClick}>{icon}</div>}
            {icon2 && <div onClick={iconClick2}>{icon2}</div>}
          </div>
        </header>
      )}
      {type === 'title' && (
        <header className="flex items-center justify-between w-full h-12 px-7">
          <div className="text-h3">{title}</div>
          <div className="flex items-center gap-2">
            {icon && <div onClick={iconClick}>{icon}</div>}
            {icon2 && <div onClick={iconClick2}>{icon2}</div>}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
