import type { Session } from 'next-auth';

declare module 'next' {
  interface NextApiRequest {
    session?: Session;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      userId: number;
      name: string;
      image: string;
    };
  }
}
