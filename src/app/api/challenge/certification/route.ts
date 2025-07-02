import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { AIHandler } from '@/service/Certification/customAxios';
import dayjs from 'dayjs';
import {
  CertificationLog,
  Challenge,
  ChallengeParticipants,
  Point,
  Transactions,
} from '@/database/models';

interface CertificationChallengeData {
  challengeId: string;
  imgURL: string;
}

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { challengeId, imgURL }: CertificationChallengeData = body;

    const validationResponse = validateRequiredFields(body, [
      'challengeId',
      'imgURL',
    ]);
    if (validationResponse) return validationResponse;

    const user = await getUserFromRequest();
    if (!user) return resUtil.unauthorized({});

    const challenge = await Challenge.findOne({ where: { id: challengeId } });
    if (!challenge) {
      return resUtil.successFalse({ message: '챌린지를 찾을 수 없습니다.' });
    }

    const participation = await ChallengeParticipants.findOne({
      where: { userId: user.id, challengeId: challenge.id },
    });

    if (!participation) {
      return resUtil.successFalse({ message: '챌린지에 참여하지 않았습니다.' });
    }

    const aiResponse = await AIHandler({
      image_url: imgURL,
      description: challenge.description,
    });

    if (!aiResponse || !aiResponse.is_match) {
      return resUtil.successFalse({
        status: 400,
        message: '챌린지 인증 실패',
        data: { aiResponse },
      });
    }

    const today = dayjs().format('YYYY-MM-DD');
    const alreadyCertified = await CertificationLog.findOne({
      where: {
        userId: user.id,
        challengeId: challenge.id,
        certifiedAt: today,
      },
    });

    if (alreadyCertified) {
      return resUtil.successFalse({ message: '오늘 이미 인증했습니다.' });
    }

    const currentStreak = parseInt(participation.streak || '0', 10);
    const newStreak = currentStreak + 1;
    const bonus = newStreak >= 3 ? (newStreak - 2) * 5 : 0;
    const earnedPoints = 10 + bonus;

    const [pointRecord] = await Point.findOrCreate({
      where: { userId: user.id },
      defaults: { userId: user.id, totalPoint: '0' },
    });

    const currentPoint = parseInt(pointRecord.totalPoint, 10);
    const newPoint = currentPoint + earnedPoints;

    await Promise.all([
      CertificationLog.create({
        userId: user.id,
        challengeId: challenge.id,
        certifiedAt: today,
        imgURL,
      }),
      participation.update({ streak: newStreak.toString() }),
      pointRecord.update({ totalPoint: newPoint.toString() }),
      Transactions.create({
        userId: user.id,
        type: 'deposit',
        amount: earnedPoints.toString(),
        balance_after: newPoint.toString(),
        description: `챌린지 인증 보상`,
      }),
    ]);

    return resUtil.successTrue({
      status: 201,
      message: `챌린지 인증 성공 (+${earnedPoints}점)`,
      data: {
        aiResponse,
        streak: newStreak,
        earnedPoints,
        totalPoint: newPoint,
      },
    });
  } catch (err) {
    console.error(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const CertificationChallenge = withLogging(withAuth(postHandler));
export const POST = CertificationChallenge;
