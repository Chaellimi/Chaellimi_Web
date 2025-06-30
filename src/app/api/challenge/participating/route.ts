import { Challenge, ChallengeParticipants } from '@/database/models';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

async function getHandler() {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    const joinedChallenges = await ChallengeParticipants.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Challenge,
          as: 'challenge',
          attributes: ['id', 'title', 'description', 'difficulty', 'day'],
        },
      ],
    });

    const responseData = joinedChallenges.map((item) => {
      const challenge = item.challenge;
      const streak = parseInt(item.streak, 10) || 0;
      const day = challenge?.day || 1;
      const achievementRate = Math.min(Math.round((streak / day) * 100), 100);

      return {
        challengeId: item.challengeId,
        joinedAt: item.joinedAt,
        streak: item.streak,
        status: item.status,
        challenge,
        achievementRate,
      };
    });

    return resUtil.successTrue({
      status: 200,
      message: '참여 중인 챌린지 목록 조회 성공',
      data: responseData,
    });
  } catch (err) {
    console.error('[참여 챌린지 조회 실패]', err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetParticipatingChallengeList = withLogging(withAuth(getHandler));

export const GET = GetParticipatingChallengeList;
