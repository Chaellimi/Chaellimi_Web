import { NextRequest } from 'next/server';
import Bookmark from '@/database/models/Bookmark';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';

async function deleteHandler(req: NextRequest) {
  try {
    const challengeId = req.nextUrl.searchParams.get('challengeId');
    if (!challengeId) {
      return resUtil.successFalse({
        status: 400,
        message: 'challengeId 값이 필요합니다.',
        data: {},
      });
    }

    const user = await getUserFromRequest();
    await Bookmark.destroy({
      where: { userId: user?.id, challengeId: Number(challengeId) },
    });

    return resUtil.successTrue({
      status: 200,
      message: '북마크 삭제 성공',
      data: {},
    });
  } catch (error) {
    console.error(error);
    return resUtil.unknownError({});
  }
}

export const DeleteBookmark = withLogging(withAuth(deleteHandler));
