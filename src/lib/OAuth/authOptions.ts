import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import Users from '@/database/models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;
      const { email, name, image } = user;
      const authId = account.providerAccountId;
      const provider = account.provider;
      try {
        const existingUser = await Users.findOne({
          where: { authId, provider },
        });
        if (!email) {
          console.error('User email is missing from OAuth provider');
          return false;
        }
        if (!existingUser) {
          await Users.create({
            authId,
            email,
            name: name ?? '',
            refreshToken: account.refresh_token ?? null,
            profileImg: image ?? '',
            provider,
          });
        }
        return true;
      } catch (err) {
        console.error('Error during signIn:', err);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user?.email) {
        const dbUser = await Users.findOne({ where: { email: user.email } });
        if (dbUser) {
          token.userId = dbUser.userId;
          token.name = dbUser.name;
          token.picture = dbUser.profileImg;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId as number,
        name: token.name as string,
        image: token.picture as string,
      };
      return session;
    },
  },
};
