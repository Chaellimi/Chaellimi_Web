import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import { Op, fn, col } from 'sequelize';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Challenge, ChallengeParticipants, Users } from '@/database/models';

async function getHandler(req: NextRequest) {
  try {
    const challengeId = Number(req.nextUrl.pathname.split('/')[3]);
    if (!challengeId) {
      return resUtil.successFalse({
        status: 400,
        message: '챌린지 ID가 제공되지 않았습니다',
      });
    }

    const challenge = await Challenge.findOne({
      where: { id: challengeId },
      attributes: {
        include: [
          [fn('COUNT', col('ChallengeParticipants.id')), 'participantCount'],
        ],
      },
      include: [
        {
          model: Users,
          as: 'User',
          attributes: ['name', 'profileImg', 'userId'],
        },
        {
          model: ChallengeParticipants,
          as: 'ChallengeParticipants',
          attributes: [],
          required: false,
        },
      ],
      group: ['Challenge.id', 'User.userId'],
      subQuery: false,
    });

    if (!challenge) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 챌린지를 찾을 수 없습니다',
      });
    }

    const userId = challenge.userId;

    const totalChallenges = await Challenge.count({
      where: { userId },
    });

    const recentChallenges = await Challenge.findAll({
      where: {
        userId,
        id: { [Op.ne]: challengeId },
      },
      order: [['createdAt', 'DESC']],
      limit: 6,
    });

    const loginUser = await getUserFromRequest();

    let joinStatus: 'not_joined' | 'in_progress' | 'completed' | 'failed' =
      'not_joined';

    if (loginUser) {
      const participant = await ChallengeParticipants.findOne({
        where: {
          challengeId,
          userId: loginUser.id,
        },
      });

      if (participant) {
        if (participant.status === 'completed') joinStatus = 'completed';
        else if (participant.status === 'failed') joinStatus = 'failed';
        else joinStatus = 'in_progress';
      }
    }

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 조회 성공',
      data: {
        challenge,
        totalChallenges,
        recentChallenges,
        joinStatus,
      },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const GetChallengeById = withLogging(withAuth(getHandler));
export const GET = GetChallengeById;
