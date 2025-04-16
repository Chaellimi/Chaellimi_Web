import React from 'react';
import {
  ChallengeIcon,
  CommunityIcon,
  HomeIcon,
  ProfileIcon,
} from '@public/icons/Navbar';

interface OwnProps {
  Active: 'home' | 'challenge' | 'community' | 'profile';
}

const Navigationbar = ({ Active }: OwnProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[430px] flex justify-between pl-6 pr-6 pt-[0.47rem] pb-[0.47rem] border-t border-gray-50 rounded-tr-[1.25rem] rounded-tl-[1.25rem] mb-8">
      <div className="flex flex-col items-center justify-center gap-1 pl-6 pr-6">
        <HomeIcon disabled={Active === 'home' ? false : true} />
        <div
          className={`text-c2 ${Active === 'home' ? 'text-primary-default' : true}`}
        >
          홈
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 pl-6 pr-6">
        <ChallengeIcon disabled={Active === 'challenge' ? false : true} />
        <div
          className={`text-c2 ${Active === 'challenge' ? 'text-primary-default' : true}`}
        >
          챌린지
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 pl-6 pr-6">
        <CommunityIcon disabled={Active === 'community' ? false : true} />
        <div
          className={`text-c2 ${Active === 'community' ? 'text-primary-default' : true}`}
        >
          커뮤니티
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 pl-6 pr-6">
        <ProfileIcon disabled={Active === 'profile' ? false : true} />
        <div
          className={`text-c2 ${Active === 'profile' ? 'text-primary-default' : true}`}
        >
          프로필
        </div>
      </div>
    </div>
  );
};

export default Navigationbar;
