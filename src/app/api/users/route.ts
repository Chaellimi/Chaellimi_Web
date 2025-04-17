import { NextResponse } from 'next/server';
import Users from '@/database/models/User';

export async function GET() {
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
