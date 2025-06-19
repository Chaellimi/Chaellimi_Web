import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import Challenge from '@/database/models/Challenge';
import resUtil from '@/lib/utils/responseUtil';
import Users from '@/database/models/User';

async function getHandler(req: NextRequest) {
  try {
    const challengeId = req.nextUrl.pathname.split('/')[3];
    console.log(challengeId);

    if (!challengeId) {
      return resUtil.successFalse({
        status: 400,
        message: '챌린지 ID가 제공되지 않았습니다',
      });
    }

    const challenges = await Challenge.findOne({
      where: { id: Number(challengeId) },
      include: [
        {
          model: Users,
          as: 'User',
          attributes: ['name', 'profileImg'],
        },
      ],
    });

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 조회 성공',
      data: { challenges },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetChallengeById = withLogging(withAuth(getHandler));
