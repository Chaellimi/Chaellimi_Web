import {
  BackArrowIcon,
  MagnifyingGlassIcon,
  SearchBarCancelIcon,
} from '@public/icons/shared';
import React from 'react';
import TextLogo from './TextLogo';

interface OwnProps {
  type: 'default' | 'search' | 'searchNoBack' | 'progress' | 'logo' | 'title';
  backClick?: () => void;
  icon?: React.ReactNode;
  iconClick?: () => void;
  icon2?: React.ReactNode;
  iconClick2?: () => void;
  title?: string;
  progress?: number;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  isSearchbarVisible?: boolean;
  setIsSearchbarVisiable?: React.Dispatch<React.SetStateAction<boolean>>;
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
  searchText,
  setSearchText,
  isSearchbarVisible,
  setIsSearchbarVisiable,
}: OwnProps) => {
  const commonHeaderClasses = 'flex items-center justify-between w-full h-12';

  const renderIcons = () => (
    <div className="flex items-center gap-[0.62rem]">
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
      {(type === 'search' || type === 'searchNoBack') && (
        <header
          className={`${commonHeaderClasses} ${type === 'search' ? 'px-6' : ''} gap-4`}
        >
          {type === 'search' ? (
            <div onClick={backClick}>
              <BackArrowIcon />
            </div>
          ) : null}

          <div className="flex items-center justify-between w-full h-12 gap-2 p-3 bg-gray-50 rounded-xl">
            <div>
              <MagnifyingGlassIcon isFocus={isSearchbarVisible} />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="w-full placeholder-gray-300 outline-none caret-black caret-w-[1.5rem] bg-gray-50 mr-2"
              value={searchText}
              onChange={(e) => {
                setSearchText?.(e.target.value);
                if (e.target.value) {
                  setIsSearchbarVisiable?.(true);
                } else {
                  setIsSearchbarVisiable?.(false);
                }
              }}
              onFocus={() => setIsSearchbarVisiable?.(true)}
              onBlur={() => {
                if (!searchText) {
                  setIsSearchbarVisiable?.(false);
                }
              }}
            />
            {isSearchbarVisible && (
              <div
                className="flex items-center justify-between"
                onClick={() => {
                  setSearchText?.('');
                }}
              >
                <SearchBarCancelIcon />
              </div>
            )}
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
