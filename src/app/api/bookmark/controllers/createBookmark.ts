import { NextRequest } from 'next/server';
import Bookmark from '@/database/models/Bookmark';
import Challenge from '@/database/models/Challenge';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateRequiredFields(body, ['challengeId']);
    if (validation) return validation;

    const { challengeId } = body;
    const user = await getUserFromRequest();

    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return resUtil.successFalse({
        status: 404,
        message: '챌린지를 찾을 수 없습니다.',
        data: {},
      });
    }

    const [bookmark] = await Bookmark.findOrCreate({
      where: { userId: user?.id, challengeId },
    });

    return resUtil.successTrue({
      status: 201,
      message: '북마크 생성 성공',
      data: bookmark,
    });
  } catch (error) {
    console.error(error);
    return resUtil.unknownError({});
  }
}

export const CreateBookmark = withLogging(withAuth(postHandler));
