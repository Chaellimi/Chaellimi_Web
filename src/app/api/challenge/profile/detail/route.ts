import { Challenge, ChallengeParticipants } from '@/database/models';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

export async function GET() {
  try {
    const user = await getUserFromRequest();

    console.log(user);

    if (!user) {
      return resUtil.unauthorized({});
    }

    // 참가중인 챌린지 목록 조회
    const participatingChallenges = await ChallengeParticipants.findAll({
      where: {
        userId: user.id,
        status: 'active',
      },
      include: [
        {
          model: Challenge,
          as: 'challenge',
          attributes: [
            'id',
            'title',
            'description',
            'imgURL',
            'difficulty',
            'day',
            'createdAt',
          ],
        },
      ],
      order: [['joinedAt', 'DESC']],
    });

    // 완료한 챌린지 목록 조회
    const completedChallenges = await ChallengeParticipants.findAll({
      where: {
        userId: user.id,
        status: 'completed',
      },
      include: [
        {
          model: Challenge,
          as: 'challenge',
          attributes: [
            'id',
            'title',
            'description',
            'imgURL',
            'difficulty',
            'day',
            'createdAt',
          ],
        },
      ],
      order: [['joinedAt', 'DESC']],
    });

    // 개설한 챌린지 목록 조회
    const createdChallenges = await Challenge.findAll({
      where: {
        userId: user.id,
      },
      attributes: [
        'id',
        'title',
        'description',
        'imgURL',
        'difficulty',
        'day',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });

    // 응답 데이터 구성
    const response = {
      participating: participatingChallenges,
      completed: completedChallenges,
      created: createdChallenges,
    };

    return resUtil.successTrue({
      status: 200,
      message: '챌린지 프로필 목록 조회 성공',
      data: response,
    });
  } catch (error) {
    console.error('챌린지 프로필 조회 오류:', error);
    return resUtil.unknownError({});
  }
}
