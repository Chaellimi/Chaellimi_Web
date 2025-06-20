import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import { Op } from 'sequelize';
import Challenge from '@/database/models/Challenge';
import Users from '@/database/models/User';
import resUtil from '@/lib/utils/responseUtil';

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
      include: [
        {
          model: Users,
          as: 'User',
          attributes: ['name', 'profileImg'],
        },
      ],
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

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 조회 성공',
      data: {
        challenge,
        totalChallenges,
        recentChallenges,
      },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const GetChallengeById = withLogging(withAuth(getHandler));

export const GET = GetChallengeById;
