import {
  ArrowIcon,
  MagnifyingGlassIcon,
  SearchBarCancelIcon,
} from '@public/icons/shared';
import React from 'react';
import TextLogo from './TextLogo';
import Link from 'next/link';

interface OwnProps {
  type: 'default' | 'search' | 'searchNoBack' | 'progress' | 'logo' | 'title';
  backClick?: string;
  icon?: React.ReactNode;
  iconClick?: string;
  icon2?: React.ReactNode;
  iconClick2?: string;
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
      {icon && <Link href={iconClick ? iconClick : '/'}>{icon}</Link>}
      {icon2 && <Link href={iconClick2 ? iconClick2 : '/'}>{icon2}</Link>}
    </div>
  );

  const renderBackButton = () => (
    <Link href={backClick ? backClick : '/'}>
      <ArrowIcon width="24" height="24" location="left" fill="#1F1F1F" />
    </Link>
  );

  return (
    <>
      {type === 'default' && (
        <header
          className={`flex items-center justify-center w-full h-12 px-6 relative`}
        >
          <div className="absolute left-[1.25rem] -translate-y-1/2 top-1/2">
            {renderBackButton()}
          </div>
          <div className="text-h3 text-gray-black ">{title}</div>
          <div className="absolute right-[1.25rem] -translate-y-1/2 top-1/2">
            {renderIcons()}
          </div>
        </header>
      )}
      {(type === 'search' || type === 'searchNoBack') && (
        <header
          className={`${commonHeaderClasses} ${type === 'search' ? 'px-6' : ''} gap-4`}
        >
          {type === 'search' ? renderBackButton() : null}

          <div className="flex items-center justify-between w-full h-12 gap-2 p-3 bg-gray-50 rounded-xl">
            <div>
              <MagnifyingGlassIcon
                width="20"
                height="20"
                fill={isSearchbarVisible ? '#848484' : '#C9C9C9'}
              />
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
                  setIsSearchbarVisiable?.(false);
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
          {renderBackButton()}
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
