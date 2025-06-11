import Transactions from '@/database/models/Transactions';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { NextResponse } from 'next/server';

async function getHandler(): Promise<NextResponse> {
  const user = await getUserFromRequest();
  try {
    const point = await Transactions.findAll({
      where: { userId: user?.id },
    });
    return resUtil.successTrue({
      data: point,
    });
  } catch (error) {
    console.error(error);
    return resUtil.unknownError({});
  }
}

export const GetPointDetail = withLogging(withAuth(getHandler));
