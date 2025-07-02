import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import { Op } from 'sequelize';
import { Challenge, Users } from '@/database/models';

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

    const validDifficulties = ['easy', 'normal', 'hard'];
    const validCategories = [
      'Health',
      'Productivity',
      'Creativity',
      'Learning',
    ];

    if (searchParams.has('category')) {
      const category = searchParams.get('category');
      if (category === null || !validCategories.includes(category)) {
        return resUtil.successFalse({
          status: 400,
          message: '유효하지 않은 카테고리입니다.',
          data: {},
        });
      }
      where.category = category;
    }

    if (searchParams.has('difficulty')) {
      const difficulty = searchParams.get('difficulty');
      if (difficulty === null || !validDifficulties.includes(difficulty)) {
        return resUtil.successFalse({
          status: 400,
          message: '유효하지 않은 난이도입니다.',
          data: {},
        });
      }
      where.difficulty = difficulty;
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

    const challenges = await Challenge.findAll({
      ...queryOptions,
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
      data: {
        challenges,
        pagination:
          limit !== undefined && offset !== undefined
            ? { page: Number(page), size: Number(size) }
            : null,
      },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetChallenge = withLogging(withAuth(getHandler));
