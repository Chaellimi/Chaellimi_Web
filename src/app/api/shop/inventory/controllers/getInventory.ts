import { Op } from 'sequelize';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Users, Inventory } from '@/database/models';
import { NextRequest } from 'next/server';

async function postHandler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const productId = searchParams.get('productId');
    if (!productId) {
      return resUtil.successFalse({
        status: 400,
        message: 'productId는 필수 파라미터입니다.',
      });
    }

    const isSoldParam = searchParams.get('isSold');
    const isUseParam = searchParams.get('isUse');
    const expiredParam = searchParams.get('expiration');

    const user = await getUserFromRequest();
    if (!user) return resUtil.unauthorized({});
    const userRole = await Users.findOne({ where: { userId: user.id } });
    if (userRole?.dataValues.role !== 'user') {
      return resUtil.successFalse({
        status: 403,
        message: '어드민 권한이 없습니다.',
      });
    }

    const whereClause: Record<string, unknown> = { productId };

    if (isSoldParam !== null) {
      whereClause.isSold = isSoldParam === 'true';
    }
    if (isUseParam !== null) {
      whereClause.isUse = isUseParam === 'true';
    }
    if (expiredParam !== null) {
      const now = new Date();
      if (expiredParam === 'true') {
        whereClause.expiration = { [Op.lt]: now };
      } else {
        whereClause.expiration = { [Op.gte]: now };
      }
    }

    const productData = await Inventory.findAll({ where: whereClause });

    return resUtil.successTrue({
      status: 200,
      message: '상품 재고 목록 조회 성공',
      data: productData,
    });
  } catch (err) {
    console.error(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetInventory = withLogging(withAuth(postHandler));
