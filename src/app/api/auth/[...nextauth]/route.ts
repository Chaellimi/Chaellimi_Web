import NextAuth from 'next-auth';
import { authOptions } from './authOptions';
import '@/database/index';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
