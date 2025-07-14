import React from 'react';
import Link from 'next/link';
import {
  ChallengeIcon,
  CommunityIcon,
  HomeIcon,
  ProfileIcon,
} from '@public/icons/Navbar';

interface OwnProps {
  Active: 'home' | 'challenge' | 'community' | 'profile';
}

const menuItems = [
  { name: 'home', icon: HomeIcon, label: '홈', path: '/' },
  {
    name: 'challenge',
    icon: ChallengeIcon,
    label: '챌린지',
    path: '/challenge',
  },
  {
    name: 'community',
    icon: CommunityIcon,
    label: '커뮤니티',
    path: '/community',
  },
  { name: 'profile', icon: ProfileIcon, label: '프로필', path: '/profile' },
];

const Navigationbar = ({ Active }: OwnProps) => {
  return (
    <div className="fixed z-50 bottom-0 custom601:bottom-8 left-1/2 -translate-x-1/2 w-full custom601:w-[430px] flex justify-between px-6 py-[0.47rem] custom601:py-3 bg-white border-t border-gray-50 rounded-tr-[1.25rem] rounded-tl-[1.25rem] custom601:rounded-b-[2rem]">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className="flex flex-col items-center justify-center gap-1 pl-6 pr-6 cursor-pointer"
        >
          <item.icon disabled={Active === item.name ? false : true} />
          <div
            className={`text-c2 ${Active === item.name ? 'text-primary-default' : 'text-gray-500'}`}
          >
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navigationbar;
