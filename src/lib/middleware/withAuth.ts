import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/OAuth/googleAuthOptions';
import resUtil from '../utils/responseUtil';

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return resUtil.successFalse({
        status: 401,
        message: 'Unauthorized',
        data: {},
      });
    }

    return handler(req);
  };
}
