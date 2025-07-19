import { Inventory, Product, Users } from '@/database/models';
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

    const userCount = await Users.count();
    const inventoryCount = await Inventory.count();
    const productCount = await Product.count();

    return resUtil.successTrue({
      status: 200,
      message: '관리자 대시보드 조회 성공',
      data: {
        userCount,
        inventoryCount,
        productCount,
      },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const AdminMain = withLogging(withAuth(getHandler));
export const GET = AdminMain;
