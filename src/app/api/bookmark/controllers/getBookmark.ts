import { NextRequest } from 'next/server';
import Bookmark from '@/database/models/Bookmark';
import Challenge from '@/database/models/Challenge';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';

async function getHandler(req: NextRequest) {
  try {
    const user = await getUserFromRequest();
    const bookmarks = await Bookmark.findAll({
      where: { userId: user?.id },
      include: [Challenge],
    });

    return resUtil.successTrue({
      status: 200,
      message: '북마크 조회 성공',
      data: bookmarks,
    });
  } catch (error) {
    console.error(error);
    return resUtil.unknownError({});
  }
}

export const GetBookmark = withLogging(withAuth(getHandler));
