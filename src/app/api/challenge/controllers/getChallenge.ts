import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import Challenge from '@/database/models/Challenge';
import resUtil from '@/lib/utils/responseUtil';
import { Op } from 'sequelize';

async function getHandler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const where: Record<string, unknown> = {};

    const dayStart = searchParams.get('dayStart');
    const dayEnd = searchParams.get('dayEnd');
    if (dayStart && dayEnd) {
      where.day = { [Op.between]: [Number(dayStart), Number(dayEnd)] };
    } else if (dayStart) {
      where.day = { [Op.gte]: Number(dayStart) };
    } else if (dayEnd) {
      where.day = { [Op.lte]: Number(dayEnd) };
    }

    if (searchParams.has('category')) {
      where.category = searchParams.get('category');
    }
    if (searchParams.has('difficulty')) {
      where.difficulty = searchParams.get('difficulty');
    }

    const page = searchParams.get('page');
    const size = searchParams.get('size');
    let limit: number | undefined = undefined;
    let offset: number | undefined = undefined;

    if (page && size) {
      limit = Number(size);
      offset = (Number(page) - 1) * limit;
    }

    const queryOptions: Record<string, unknown> = { where };
    if (limit !== undefined && offset !== undefined) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const challenges = await Challenge.findAll(queryOptions);

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 조회 성공',
      data: {
        challenges,
        pagination:
          limit !== undefined && offset !== undefined
            ? { page: Number(page), size: Number(size) }
            : null,
      },
    });
  } catch {
    return resUtil.unknownError({});
  }
}

export const GetChallenge = withLogging(withAuth(getHandler));
