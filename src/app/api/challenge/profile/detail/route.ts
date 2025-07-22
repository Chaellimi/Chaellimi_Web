import { Challenge, ChallengeParticipants, Users } from '@/database/models';
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
    const todayTime = today.getTime();

    const participatingChallenges: typeof allParticipations = [];
    const completedChallenges: typeof allParticipations = [];

    allParticipations.forEach((participation) => {
      if (!participation.challenge) return;

      const joinedDate = new Date(participation.joinedAt);
      const challengeDurationMs =
        participation.challenge.day * 24 * 60 * 60 * 1000;
      const challengeEndTime = joinedDate.getTime() + challengeDurationMs;

      if (
        todayTime > challengeEndTime ||
        participation.status === 'completed'
      ) {
        completedChallenges.push(participation);
      } else {
        participatingChallenges.push(participation);
      }
    });

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
