import { NextResponse } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import { withLogging } from '@/lib/middleware/withLogging';

async function handler() {
  try {
    return NextResponse.json(
      resUtil.successTrue({
        status: 200,
        message: 'API Test Success',
        data: {},
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(resUtil.unknownError);
  }
}

export const GET = withLogging(handler);
