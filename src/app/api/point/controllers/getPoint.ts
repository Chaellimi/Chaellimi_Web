import Point from '@/database/models/Point';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { NextResponse } from 'next/server';

async function getHandler(): Promise<NextResponse> {
  const user = await getUserFromRequest();
  try {
    const point = await Point.findOne({
      where: { userId: user?.id },
      attributes: ['totalPoint'],
    });
    return resUtil.successTrue({
      data: point || { totalPoint: 0 },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetPoint = withLogging(withAuth(getHandler));
