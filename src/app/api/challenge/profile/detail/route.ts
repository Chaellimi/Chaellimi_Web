import {
  Challenge,
  ChallengeParticipants,
  Users,
  CertificationLog,
} from '@/database/models';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

export async function GET() {
  try {
    const user = await getUserFromRequest();

    console.log(user);

    if (!user) {
      return resUtil.unauthorized({});
    }

    const allParticipations = await ChallengeParticipants.findAll({
      where: {
        userId: user.id,
        status: ['active'],
      },
      include: [
        {
          model: Challenge,
          as: 'challenge',
          attributes: [
            'id',
            'title',
            'description',
            'imgURL',
            'difficulty',
            'day',
            'createdAt',
          ],
          include: [
            {
              model: Users,
              as: 'User',
              attributes: ['name', 'profileImg'],
            },
          ],
        },
      ],
      order: [['joinedAt', 'DESC']],
    });

    const today = new Date();

    const participatingChallenges: typeof allParticipations = [];
    const completedChallenges: typeof allParticipations = [];

    // 각 참여 기록에 대해 완료 여부 확인
    for (const participation of allParticipations) {
      if (!participation.challenge) continue;

      const joinedDate = new Date(participation.joinedAt);
      const challengeEndDate = new Date(joinedDate);
      challengeEndDate.setDate(
        joinedDate.getDate() + participation.challenge.day
      );

      const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endDateOnly = new Date(
        challengeEndDate.getFullYear(),
        challengeEndDate.getMonth(),
        challengeEndDate.getDate()
      );

      // 인증 완료 여부 확인
      const certificationCount = await CertificationLog.count({
        where: {
          userId: user.id,
          challengeId: participation.challengeId,
        },
      });

      const isDateCompleted = todayDate >= endDateOnly;
      const isCertificationCompleted =
        certificationCount >= participation.challenge.day;
      const isStatusCompleted = participation.status === 'completed';

      if (isDateCompleted || isCertificationCompleted || isStatusCompleted) {
        completedChallenges.push(participation);
      } else {
        participatingChallenges.push(participation);
      }
    }

    const createdChallenges = await Challenge.findAll({
      where: {
        userId: user.id,
      },
      attributes: [
        'id',
        'title',
        'description',
        'imgURL',
        'difficulty',
        'day',
        'createdAt',
      ],
      include: [
        {
          model: Users,
          as: 'User',
          attributes: ['name', 'profileImg'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // participantCount 추가하는 함수 (참가 기록용)
    const addParticipantCount = async (
      challenges: typeof allParticipations
    ) => {
      return await Promise.all(
        challenges.map(async (challenge) => {
          const challengeData = challenge.challenge;
          if (challengeData) {
            const participantCount = await ChallengeParticipants.count({
              where: {
                challengeId: challengeData.id,
              },
            });

            return {
              ...challenge.toJSON(),
              challenge: {
                ...challengeData.toJSON(),
                participantCount,
              },
            };
          }
          return challenge;
        })
      );
    };

    // participantCount 추가하는 함수 (개설한 챌린지용)
    const addParticipantCountToCreated = async (
      challenges: typeof createdChallenges
    ) => {
      return await Promise.all(
        challenges.map(async (challenge) => {
          const participantCount = await ChallengeParticipants.count({
            where: {
              challengeId: challenge.id,
            },
          });

          return {
            ...challenge.toJSON(),
            participantCount,
          };
        })
      );
    };

    // participantCount 추가
    const participatingWithCount = await addParticipantCount(
      participatingChallenges
    );
    const completedWithCount = await addParticipantCount(completedChallenges);
    const createdWithCount =
      await addParticipantCountToCreated(createdChallenges);

    const response = {
      participating: participatingWithCount,
      completed: completedWithCount,
      created: createdWithCount,
    };

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 프로필 목록 조회 성공',
      data: response,
    });
  } catch (error) {
    console.error('챌린지 프로필 조회 오류:', error);
    return resUtil.unknownError({});
  }
}
