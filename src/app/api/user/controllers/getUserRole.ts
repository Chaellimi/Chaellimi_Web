import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Users } from '@/database/models';

async function getHandler() {
  try {
    const user = await getUserFromRequest();

    if (!user) {
      return resUtil.unauthorized({});
    }

    const UserData = await Users.findOne({ where: { userId: user.id } });

    return resUtil.successTrue({
      status: 200,
      message: '유저 정보 조회 성공',
      data: { UserData: UserData?.dataValues },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetUserRole = withLogging(withAuth(getHandler));
