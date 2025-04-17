// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { withLogging } from '@/lib/middleware/withLogging';
import Users from '@/database/models/User';

async function handler() {
  try {
    const data = await Users.findAll({
      attributes: ['userId', 'email', 'name'],
      paranoid: false,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const GET = withLogging(handler);
