/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import {
  Bookmark,
  Challenge,
  Users,
  ChallengeParticipants,
} from '@/database/models';

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
              include: [
                {
                  model: Users,
                  as: 'User',
                  attributes: ['userId', 'name', 'profileImg'],
                },
              ],
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

    // 각 북마크된 챌린지에 대해 참여자 수를 계산
    const bookmarksWithParticipantCount = await Promise.all(
      (userBookmarks as any).bookmarks.map(async (bookmark: any) => {
        const participantCount = await ChallengeParticipants.count({
          where: {
            challengeId: bookmark.challenge.id,
          },
        });

        return {
          ...bookmark.toJSON(),
          challenge: {
            ...bookmark.challenge.toJSON(),
            participantCount,
          },
        };
      })
    );

    return resUtil.successTrue({
      status: 200,
      message: '북마크 조회 성공',
      data: bookmarksWithParticipantCount,
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetBookmark = withLogging(withAuth(postHandler));
