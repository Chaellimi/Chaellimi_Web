import { NextResponse } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import { withLogging } from '@/lib/middleware/withLogging';
import logger from '@/lib/logger';

async function handler() {
  try {
    return NextResponse.json(
      resUtil.successTrue({
        status: 200,
        message: 'API Test Success',
        data: {},
      })
    );
  } catch (err) {
    logger.error('API Test handler error:', { err });
    return resUtil.unknownError({ data: { err } });
  }
}

export const GET = withLogging(handler);
