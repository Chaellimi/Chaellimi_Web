import Challenge from '@/database/models/Challenge';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { NextRequest } from 'next/server';
import { ChallengeData } from '../Challenge';

async function updateHandler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const challengeId = searchParams.get('id');
    const body = await req.json();
    const {
      title,
      description,
      category,
      difficulty,
      day,
      imgURL,
    }: ChallengeData = body;

    if (!challengeId) {
      return resUtil.successFalse({
        status: 400,
        message: '챌린지 ID가 필요합니다.',
      });
    }

    const challenge = await Challenge.findOne({ where: { id: challengeId } });
    if (!challenge) {
      return resUtil.successFalse({
        status: 404,
        message: '챌린지를 찾을 수 없습니다.',
      });
    }

    const user = await getUserFromRequest();
    if (challenge.userId !== user?.id) {
      return resUtil.successFalse({
        status: 403,
        message: '챌린지 수정 권한이 없습니다.',
      });
    }

    await Challenge.update(
      { title, description, category, difficulty, day, imgURL },
      { where: { id: challengeId } }
    );

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 수정 성공',
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const UpdateChallenge = withLogging(withAuth(updateHandler));
