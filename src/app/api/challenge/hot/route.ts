import { fn, col, literal } from 'sequelize';
import { Challenge, ChallengeParticipants } from '@/database/models';
import resUtil from '@/lib/utils/responseUtil';
import { withLogging } from '@/lib/middleware/withLogging';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextRequest } from 'next/server';

export async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 5;

    if (isNaN(limit) || limit <= 0) {
      return resUtil.successFalse({
        status: 400,
        message: 'limit 파라미터는 양의 정수여야 합니다',
      });
    }

    const popularChallenges = await Challenge.findAll({
      attributes: {
        include: [
          [fn('COUNT', col('ChallengeParticipants.id')), 'participantCount'],
        ],
      },
      include: [
        {
          model: ChallengeParticipants,
          as: 'ChallengeParticipants',
          attributes: [],
          required: false,
        },
      ],
      group: ['Challenge.id'],
      order: [[literal('participantCount'), 'DESC']],
      limit,
      subQuery: false,
    });

    return resUtil.successTrue({
      status: 200,
      message: '상위 인기 챌린지 조회 성공',
      data: popularChallenges,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const GetHotChallenge = withLogging(withAuth(getHandler));
export const GET = GetHotChallenge;
