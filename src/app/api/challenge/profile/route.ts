import { Challenge, Users, ChallengeParticipants } from '@/database/models';
import resUtil from '@/lib/utils/responseUtil';

export async function GET() {
  try {
    const userId = 1;

    // 사용자 정보 확인
    const user = await Users.findByPk(userId);
    if (!user) {
      return resUtil.unauthorized({});
    }

    // 참가중인 챌린지 개수 조회
    const participatingCount = await ChallengeParticipants.count({
      where: {
        userId: userId,
        status: 'active',
      },
    });

    // 완료한 챌린지 개수 조회
    const completedCount = await ChallengeParticipants.count({
      where: {
        userId: userId,
        status: 'completed',
      },
    });

    // 개설한 챌린지 개수 조회
    const createdCount = await Challenge.count({
      where: {
        userId: userId,
      },
    });

    // 응답 데이터 구성
    const response = {
      participating: participatingCount,
      completed: completedCount,
      created: createdCount,
    };

    return resUtil.successTrue({
      status: 200,
      message: '참여 중인 챌린지 목록 조회 성공',
      data: response,
    });
  } catch (error) {
    console.error('챌린지 프로필 조회 오류:', error);
    return resUtil.unknownError({});
  }
}
