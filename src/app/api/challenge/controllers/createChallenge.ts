import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { ChallengeData } from '../Challenge';
import { Challenge } from '@/database/models';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      difficulty,
      day,
      imgURL,
    }: ChallengeData = body;

    const validationResponse = validateRequiredFields(body, [
      'title',
      'description',
      'category',
      'difficulty',
      'day',
      'imgURL',
    ]);

    if (!validationResponse?.bodyUsed)
      return resUtil.successTrue({
        status: 400,
        message: '필수 필드가 누락되었습니다.',
      });

    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    const newChallenge = await Challenge.create({
      userId: user.id,
      title,
      description,
      category,
      difficulty,
      day,
      imgURL,
    });

    return resUtil.successTrue({
      status: 201,
      message: '챌린지 생성 성공',
      data: newChallenge,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const CreateChallenge = withLogging(withAuth(postHandler));
