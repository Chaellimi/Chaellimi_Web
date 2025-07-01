import NextAuth from 'next-auth';
import '@/database/index';
import { authOptions } from '@/lib/OAuth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
