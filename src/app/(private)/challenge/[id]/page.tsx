'use client';

import ActionSheet from '@/components/shared/ActionSheet';
import BottomButton from '@/components/shared/BottomButton';
import Header from '@/components/shared/Header';
import SelectModal from '@/components/shared/SelectModal';
import { MoreVerticalDotIcon } from '@public/icons/Challenge/id';
import {
  ArrowIcon,
  BookmarkIcon,
  EditIcon,
  FireIcon,
  ShareIcon,
  TrashIcon,
} from '@public/icons/shared';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStatusBarBridge from '@/lib/hooks/useStatusBarBridge';
import { useGetChallengeById } from '@/service/Challenge/challenge.query';
import Loading from '@/components/shared/Loading';
import { ChangeKOR } from '@/lib/utils/getChangeCategory';
import { timeAgo } from '@/lib/utils/timeAgo';
import { useSession } from 'next-auth/react';
import html2canvas from 'html2canvas';
import {
  useDeleteChallenge,
  useJoinChallenge,
} from '@/service/Challenge/challenge.mutation';
import { ChallengeWriteType } from '@/types/Challenge';
import { useGetUserRole } from '@/service/shared/shared.query';

interface recentChallengesType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  day: number;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

const ChallengeSingle = () => {
  const router = useRouter();
  const { id } = useParams();
  const backPath = useSearchParams().get('back');

  const [actionSheet, setActionSheet] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenRefusalModal, setIsOpenRefusalModal] = useState(false);

  const myInfo = useSession();
  const { data: ChallengeData, isLoading } = useGetChallengeById(
    id ? Number(id) : 0
  );

  type ChallengeByIdResponse = {
    data: {
      challenge: ChallengeWriteType;
      recentChallenges: recentChallengesType[];
      totalChallenges: number;
      joinStatus: string;
    };
  };

  const typedEditData = ChallengeData as ChallengeByIdResponse | undefined;
  const challengeData = typedEditData?.data;

  const challenge = challengeData?.challenge;
  const recentChallenges = challengeData?.recentChallenges ?? [];
  const totalChallenges = challengeData?.totalChallenges ?? [];
  const isJoinedChallenge = challengeData?.joinStatus ?? false;

  useStatusBarBridge(
    {
      backgroundColor: '#FFF',
      translucent: true,
      bottomBackgroundColor: '#FFF',
    },
    [isOpenConfirmModal]
  );

  const { data: userRoleData, isLoading: getUserRoleLoading } =
    useGetUserRole();

  const isOwner =
    myInfo?.data?.user.userId == challenge?.userId ||
    userRoleData?.data?.UserData?.role === 'admin';

  const handleShare = async () => {
    try {
      setActionSheet(false);
      const element = document.getElementById('challenge-single-root');
      if (!element) return;
      const canvas = await html2canvas(element);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'screenshot.png', { type: blob.type });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: challenge?.title,
            text: challenge?.description || '',
          });
        } else {
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
      });
    } catch (error) {
      console.error('Share failed', error);
    }
  };

  const actionButtons = [
    {
      icons: <ShareIcon />,
      text: '공유',
      onClick: handleShare,
    },
    ...(isOwner
      ? [
          {
            icons: <EditIcon />,
            text: '수정',
            onClick: () => {
              router.push(`/challenge/write?mode=edit&id=${id}`);
            },
          },
          {
            icons: <TrashIcon />,
            text: '삭제',
            textColor: 'red-200',
            onClick: () => {
              setIsOpenDeleteModal(true);
            },
          },
        ]
      : []),
  ];

  const { mutate: deleteChallengeMutation, isPending } = useDeleteChallenge();
  const { mutate: joinChallengeMutation, isPending: isJoiningChallenge } =
    useJoinChallenge();

  const deleteChallenge = () => {
    deleteChallengeMutation(Number(id), {
      onSuccess: () => {
        setIsOpenDeleteModal(false);
        router.push(backPath ? backPath : '/challenge');
      },
      onError: (error) => {
        type ErrorWithResponse = {
          response?: {
            status?: number;
          };
        };
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          (error as ErrorWithResponse).response?.status === 403
        ) {
          setIsOpenDeleteModal(false);
          setIsOpenRefusalModal(true);
          return;
        }
        setIsOpenDeleteModal(false);
      },
    });
  };

  if (isLoading || isPending || getUserRoleLoading || isJoiningChallenge) {
    return <Loading />;
  }

  return (
    <div className="relative flex flex-col w-full h-full text-gray-black">
      {actionSheet && (
        <div
          className="absolute z-10 w-full h-full"
          onClick={() => {
            setActionSheet(false);
          }}
        />
      )}
      <Header
        type="default"
        title="챌린지 상세"
        backClick={backPath ? backPath : '/challenge'}
      />

      <div className="flex flex-col w-full h-full overflow-y-scroll">
        {/* Main Image */}
        <div className="relative w-full h-[12.5rem] ">
          <Image
            src={challenge?.imgURL ?? '/images/default-challenge.png'}
            alt=""
            width={200}
            height={200}
            className="object-cover object-top w-full h-full"
          />
        </div>

        {/* Challenge Info */}
        <div className="flex flex-col w-full pt-[1.88rem]">
          {/* Info */}
          <div className="flex flex-col w-full px-6 gap-[0.31rem] relative">
            <div className="flex items-center justify-between w-full gap-1">
              <div className="flex items-center gap-1">
                <div
                  className={`text-center text-c2 px-[0.38rem] py-[0.15rem] rounded-[0.25rem] w-16
                ${
                  challenge?.difficulty === 'hard'
                    ? 'bg-red-100 text-red-200'
                    : challenge?.difficulty === 'normal'
                      ? 'bg-primary-light text-primary-default'
                      : 'bg-green-100 text-green-200'
                }
                `}
                >
                  {challenge?.difficulty === 'hard'
                    ? '난이도 상'
                    : challenge?.difficulty === 'normal'
                      ? '난이도 중'
                      : '난이도 하'}
                </div>
                <div className="text-center text-c2 first-line px-[0.38rem] py-[0.15rem] bg-gray-50 rounded-[0.25rem] w-16 text-gray-500">
                  {challenge?.day}일 도전
                </div>
              </div>
              <div
                className="absolute z-20 w-6 h-6 right-6"
                onClick={() => {
                  setActionSheet(!actionSheet);
                }}
              >
                <MoreVerticalDotIcon />
              </div>

              {actionSheet && (
                <div className="absolute z-10 cursor-pointer right-6 top-6">
                  <ActionSheet buttons={actionButtons} />
                </div>
              )}
            </div>

            <div className="text-h2">{challenge?.title}</div>

            <div className="flex items-center gap-1 text-gray-500 text-c1">
              <div>{ChangeKOR(challenge?.category ?? '')}</div>
              <div>·</div>
              <div>{timeAgo(challenge?.createdAt ?? '')}</div>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col w-full px-6 gap-[0.622rem] mt-6">
            <div className="flex items-center gap-1">
              <FireIcon />
              <div className="text-gray-500 text-b3">300명 도전중</div>
            </div>

            <div className="text-h3">챌린지 소개</div>

            <div className="text-b2">{challenge?.description}</div>
          </div>
        </div>

        {/* Provider */}
        <div className="w-full my-4 min-h-1 bg-gray-50" />

        {/* Profile */}
        <div className="flex items-center justify-between w-full px-6">
          <div className="flex items-center gap-[0.62rem]">
            <div className="relative rounded-full w-9 h-9">
              <Image
                src={challenge?.imgURL ?? '/images/default-challenge.png'}
                alt=""
                width={36}
                height={36}
                className="object-cover object-top w-full h-full rounded-full"
              />
            </div>
            <div>
              <div className="text-b3">{challenge?.User?.name}</div>
              <div className="text-c1">챌린지 개설 {totalChallenges}개</div>
            </div>
          </div>
          <div>
            <ArrowIcon location="right" />
          </div>
        </div>

        {/* Provider */}
        <div className="w-full my-4 min-h-1 bg-gray-50" />

        {recentChallenges && recentChallenges.length > 0 && (
          <div className="flex flex-col px-6 gap-[0.63rem]">
            <div className="text-he">이런 챌린지는 어때요?</div>

            <div className="grid grid-cols-3 gap-x-5 gap-y-5">
              {recentChallenges.map((item: recentChallengesType) => (
                <div
                  className="flex flex-col gap-[0.63rem]"
                  key={item.id}
                  onClick={() => router.push(`/challenge/${item.id}`)}
                >
                  <div
                    className="aspect-square rounded-xl w-[6.25rem] h-[6.25rem]"
                    style={{
                      backgroundImage: `url(${item.imgURL})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex flex-col justify-between h-full w-full px-[0.66rem] py-2">
                      <div className="flex justify-end w-full">
                        <BookmarkIcon width="19" height="18" />
                      </div>
                    </div>
                  </div>
                  <div className="text-fn">{item.title}</div>
                </div>
              ))}
            </div>

            {/* <button className="flex items-center justify-center w-full text-gray-500 text-bn3 h-11 rounded-xl bg-gray-50">
            다른 챌린지 더 보기
          </button> */}
          </div>
        )}

        <div className="w-full px-6 bg-gray-50 py-[0.62rem] mt-[1.88rem]">
          <span className="text-gray-400 text-fn">
            주의사항 <br />
          </span>
          <span className="text-gray-400 text-c1">
            1. 인증은 하루 1회만 가능합니다. <br />
            2. 중간에 챌린지를 포기하면 연속 달성일 수가 초기화됩니다. <br />
            3. 챌린지 종료 후 목표를 완료하지 못하면 다시 시작할 수 없습니다.
          </span>
          <br />
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-16 gap-4 px-6 pt-3 border-t bg-gray-white border-gray-50 custom601:mb-6">
        <div
          onClick={() => {
            setIsBookmarked(!isBookmarked);
            router.push(`/challenge/${id}/progress`);
          }}
        >
          <BookmarkIcon
            width="24"
            height="24"
            stroke="black"
            isChecked={isBookmarked}
          />
        </div>
        <div className="h-7 w-[0.0625rem] bg-gray-200" />
        <BottomButton
          title="참여하기"
          onClick={() => {
            setIsOpenConfirmModal(true);
          }}
          disabled={
            isJoinedChallenge == 'not_joined'
              ? 'false'
              : isJoinedChallenge == 'in_progress'
                ? 'progress'
                : 'true'
          }
        />
      </div>

      {isOpenConfirmModal && (
        <SelectModal
          title="이 챌린지에 참여하시겠습니까?"
          description="내일부터 챌린지가 시작됩니다."
          cancel={() => {
            setIsOpenConfirmModal(false);
          }}
          confirm={() => {
            joinChallengeMutation(id as string, {
              onSuccess: () => {
                setIsOpenConfirmModal(false);
                router.push(`/`);
              },
              onError: (error) => {
                console.error('챌린지 참여 실패:', error);
              },
            });
          }}
        />
      )}

      {isOpenDeleteModal && (
        <SelectModal
          title="이 챌린지를 삭제하시겠습니까?"
          description="누군가 참여중인 챌린지는 삭제가 불가능합니다."
          cancel={() => {
            setIsOpenDeleteModal(false);
          }}
          confirm={deleteChallenge}
        />
      )}

      {isOpenRefusalModal && (
        <SelectModal
          title="챌린지 삭제가 불가능합니다."
          description="누군가 참여중인 챌린지는 삭제가 불가능합니다."
          confirm={() => {
            setIsOpenRefusalModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ChallengeSingle;
