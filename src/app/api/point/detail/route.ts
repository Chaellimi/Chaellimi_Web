import Transactions from '@/database/models/Transactions';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { NextRequest, NextResponse } from 'next/server';

async function getHandler(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await getUserFromRequest();
    const type = req.nextUrl.searchParams.get('type');

    const where = {
      userId: user?.id,
      ...(type === 'deposit' || type === 'withdrawal' ? { type } : {}),
    };

    const transactions = await Transactions.findAll({ where });

    return resUtil.successTrue({ data: transactions });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const GetPointDetail = withLogging(withAuth(getHandler));

export const GET = GetPointDetail;
