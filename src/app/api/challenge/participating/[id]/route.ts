import { NextRequest } from 'next/server';
import {
  Challenge,
  ChallengeParticipants,
  CertificationLog,
  Transactions,
} from '@/database/models';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';

async function getHandler(req: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) return resUtil.unauthorized({});

    const challengeId = Number(req.nextUrl.pathname.split('/')[4]);
    if (Number.isNaN(challengeId))
      return resUtil.successFalse({ message: '유효하지 않은 ID' });

    const participation = await ChallengeParticipants.findOne({
      where: { userId: user.id, challengeId },
      include: [{ model: Challenge, as: 'challenge' }],
    });

    if (!participation)
      return resUtil.successFalse({
        status: 404,
        message: '참여하지 않은 챌린지',
      });

    const { challenge, joinedAt, streak } = participation;
    const challengeDay = challenge?.day ?? 30;

    const certLogs = await CertificationLog.findAll({
      where: { userId: user.id, challengeId },
    });

    const certifiedDays = certLogs.map((log) => {
      const date = new Date(log.certifiedAt);
      date.setHours(23, 59, 59, 59);
      return date.toISOString().split('T')[0];
    });

    const pointLogs = await Transactions.findAll({
      where: {
        userId: user.id,
        challengeId: challengeId,
        type: 'deposit',
      },
      order: [['createdAt', 'DESC']],
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const achievementRate = Math.min(
      Math.round((Number(streak) / challengeDay) * 100),
      100
    );

    const pointSavingLog = pointLogs.map((item) => {
      return {
        id: item.id,
        type: item.type,
        amount: item.amount,
        description: item.description,
        balance_after: item.balance_after,
        createdAt: item.createdAt.toISOString(),
      };
    });

    return resUtil.successTrue({
      message: '챌린지 상세 조회 성공',
      data: {
        challengeId,
        title: challenge?.title,
        joinedAt,
        totalDay: challengeDay,
        streak: Number(streak),
        achievementRate,
        certifiedDays,
        today: today.toISOString().split('T')[0],
        isCertifiedToday: certifiedDays.includes(
          today.toISOString().split('T')[0]
        ),
        pointSavingLog,
      },
    });
  } catch (err) {
    console.error('[챌린지 상세 조회 실패]', err);
    return resUtil.unknownError({ data: { err } });
  }
}

const GetJoinChallengeById = withLogging(withAuth(getHandler));
export const GET = GetJoinChallengeById;
