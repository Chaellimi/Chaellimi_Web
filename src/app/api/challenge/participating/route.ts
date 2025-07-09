import { Op } from 'sequelize';
import {
  Challenge,
  ChallengeParticipants,
  CertificationLog,
} from '@/database/models';
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
          attributes: [
            'id',
            'title',
            'description',
            'difficulty',
            'day',
            'imgURL',
          ],
        },
      ],
    });

    const today = new Date();
    today.setHours(23, 59, 59, 59);
    today.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayCertifications = await CertificationLog.findAll({
      where: {
        userId: user.id,
        certifiedAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
      attributes: ['challengeId'],
    });

    const certifiedChallengeIds = new Set(
      todayCertifications.map((item) => item.challengeId)
    );

    const responseData = joinedChallenges.map((item) => {
      const challenge = item.challenge;
      const streak = parseInt(item.streak, 10) || 0;
      const day = challenge?.day || 1;
      const achievementRate =
        day > 0 ? Math.min(Math.round((streak / day) * 100), 100) : 0;

      return {
        challengeId: item.challengeId,
        joinedAt: item.joinedAt,
        streak: item.streak,
        status: item.status,
        challenge,
        achievementRate,
        isCertifiedToday: certifiedChallengeIds.has(item.challengeId),
      };
    });

    responseData.sort((a, b) => {
      const getPriority = (item: (typeof responseData)[0]) => {
        if (item.achievementRate === 100) return 2;
        if (item.isCertifiedToday) return 1;
        return 0;
      };

      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
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

const GetParticipatingChallengeList = withLogging(withAuth(getHandler));
export const GET = GetParticipatingChallengeList;
