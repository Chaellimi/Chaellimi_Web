import { Users } from '@/database/models';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';

async function getHandler() {
  try {
    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 400,
        message: '어드민 권한이 없습니다.',
      });
    }

    const users = await Users.findAll();

    return resUtil.successTrue({
      status: 200,
      message: '유저 조회 성공',
      data: users,
    });
  } catch (error) {
    return resUtil.unknownError({ data: { error: error } });
  }
}

export const getUsers = withLogging(withAuth(getHandler));
