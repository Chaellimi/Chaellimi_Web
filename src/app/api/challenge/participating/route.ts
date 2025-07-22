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
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];

    // 각 챌린지별 인증 로그 조회
    const allCertifications = await CertificationLog.findAll({
      where: {
        userId: user.id,
      },
      attributes: ['challengeId', 'certifiedAt'],
    });

    // 챌린지별로 오늘 인증 여부 계산
    const certifiedTodayMap = new Map<number, boolean>();
    allCertifications.forEach((cert) => {
      const certDate = new Date(cert.certifiedAt);
      certDate.setHours(0, 0, 0, 0);
      const certDateString = certDate.toISOString().split('T')[0];

      if (certDateString === todayString) {
        certifiedTodayMap.set(cert.challengeId, true);
      }
    });

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
        isCertifiedToday: certifiedTodayMap.get(item.challengeId) || false,
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
