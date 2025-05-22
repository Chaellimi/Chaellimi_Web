import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import Challenge from '@/database/models/Challenge';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

interface ChallengeData {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
  day: string;
  imgURL: string;
}

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

    if (validationResponse) return validationResponse;

    const user = await getUserFromRequest();

    if (!user) {
      return resUtil.successFalse({
        status: 401,
        message: 'Unauthorized',
        data: {},
      });
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
  } catch (error) {
    console.error(error);
    return resUtil.unknownError({});
  }
}

export const CreateChallenge = withLogging(withAuth(postHandler));
