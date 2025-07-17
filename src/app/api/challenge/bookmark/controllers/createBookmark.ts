import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { Bookmark, Challenge } from '@/database/models';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { challengeId } = body;

    const validationResponse = validateRequiredFields(body, ['challengeId']);
    if (validationResponse) return validationResponse;

    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    // 챌린지 존재 여부 확인
    const challenge = await Challenge.findOne({
      where: { id: challengeId },
    });
    if (!challenge) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 챌린지를 찾을 수 없습니다',
      });
    }

    // 이미 북마크가 존재하는지 확인
    const bookmark = await Bookmark.findOne({
      where: {
        challengeId,
        userId: user.id,
      },
    });

    // 이미 북마크가 존재하면 삭제 처리 아니면 새로 생성
    if (bookmark) {
      await bookmark.destroy();
      return resUtil.successFalse({
        status: 409,
        message: '북마크를 취소했습니다.',
      });
    } else {
      const newBookmark = await Bookmark.create({
        challengeId,
        userId: user.id,
      });

      return resUtil.successTrue({
        status: 201,
        message: '북마크 생성 성공',
        data: newBookmark,
      });
    }
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const CreateBookmark = withLogging(withAuth(postHandler));
