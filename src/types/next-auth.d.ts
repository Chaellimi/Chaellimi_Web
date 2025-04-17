import type { Session } from 'next-auth';

declare module 'next' {
  interface NextApiRequest {
    session?: Session;
  }
}
