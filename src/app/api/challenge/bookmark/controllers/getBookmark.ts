/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { Bookmark, Challenge, Users } from '@/database/models';

async function postHandler() {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    const userBookmarks = await Users.findByPk(user.id, {
      include: [
        {
          model: Bookmark,
          as: 'bookmarks',
          include: [
            {
              model: Challenge,
              as: 'challenge',
            },
          ],
        },
      ],
    });

    if (!userBookmarks) {
      return resUtil.successFalse({
        status: 404,
        message: '사용자의 북마크를 찾을 수 없습니다',
      });
    }

    return resUtil.successTrue({
      status: 200,
      message: '북마크 조회 성공',
      data: (userBookmarks as any).bookmarks,
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetBookmark = withLogging(withAuth(postHandler));
