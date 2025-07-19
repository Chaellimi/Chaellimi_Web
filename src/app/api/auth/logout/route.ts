import { cookies } from 'next/headers';
import resUtil from '@/lib/utils/responseUtil';

export async function POST() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  return resUtil.successTrue({
    status: 200,
    message: '로그아웃 성공',
  });
}
