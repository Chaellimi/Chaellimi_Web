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
  const commonHeaderClasses = 'flex items-center justify-between w-full h-12';

  const renderIcons = () => (
    <div className="flex items-center gap-2">
      {icon && <div onClick={iconClick}>{icon}</div>}
      {icon2 && <div onClick={iconClick2}>{icon2}</div>}
    </div>
  );

  return (
    <>
      {type === 'default' && (
        <header className={`${commonHeaderClasses} px-6`}>
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          {renderIcons()}
        </header>
      )}
      {type === 'search' && (
        <header className={`${commonHeaderClasses} px-6`}>
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          <div className="flex items-center gap-2">
            <input type="text" />
          </div>
        </header>
      )}
      {type === 'progress' && (
        <header className={`${commonHeaderClasses} px-6`}>
          <div onClick={backClick}>
            <BackArrowIcon />
          </div>
          <div className="flex items-center gap-2">{progress}</div>
          {renderIcons()}
        </header>
      )}
      {type === 'logo' && (
        <header className={`${commonHeaderClasses} px-7`}>
          <div>
            <TextLogo width={75} />
          </div>
          {renderIcons()}
        </header>
      )}
      {type === 'title' && (
        <header className={`${commonHeaderClasses} px-7`}>
          <div className="text-h3">{title}</div>
          {renderIcons()}
        </header>
      )}
    </>
  );
};

export default Header;
