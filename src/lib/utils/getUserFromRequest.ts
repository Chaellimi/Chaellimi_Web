/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/OAuth/googleAuthOptions';
import Users from '@/database/models/User';

export interface SessionUser {
  id: number;
  name?: string;
  email?: string;
  image?: string;
}

export async function getUserFromRequest(
  req: NextRequest
): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.userId) {
    return null;
  }

  const userId = Number(session.user.userId);

  const data = await Users.findOne({
    attributes: ['userId', 'email', 'name'],
    where: { userId },
    paranoid: false,
  });

  if (!data) return null;

  return {
    id: userId,
    name: data.name,
    email: data.email,
    image: session.user.image ?? null,
  };
}

export default getUserFromRequest;
