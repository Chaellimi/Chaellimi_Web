import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Challenge, ChallengeParticipants } from '@/database/models';

async function joinHandler(req: NextRequest) {
  try {
    const challengeId = Number(req.nextUrl.pathname.split('/')[3]);
    if (!challengeId) {
      return resUtil.successFalse({
        status: 400,
        message: '챌린지 ID가 제공되지 않았습니다',
      });
    }

    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 챌린지를 찾을 수 없습니다',
      });
    }

    const user = await getUserFromRequest();

    if (!user) {
      return resUtil.unauthorized({});
    }

    const alreadyJoined = await ChallengeParticipants.findOne({
      where: { challengeId, userId: user.id },
    });

    if (alreadyJoined) {
      return resUtil.successFalse({
        status: 409,
        message: '이미 참여 중인 챌린지입니다',
      });
    }

    await ChallengeParticipants.create({
      userId: user.id,
      challengeId,
      joinedAt: new Date().toISOString(),
      streak: '0',
      status: 'active',
    });

    return resUtil.successTrue({
      status: 201,
      message: '챌린지 참여 완료',
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const JoinChallenge = withLogging(withAuth(joinHandler));

export const POST = JoinChallenge;
