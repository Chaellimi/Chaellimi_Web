import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Product, Users, Inventory } from '@/database/models';

async function postHandler() {
  try {
    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    let productData;

    if (userRole?.dataValues.role === 'user') {
      productData = await Product.findAll({
        include: [
          {
            model: Inventory,
            as: 'inventories',
            where: {
              isSold: false,
              isUse: false,
            },
            required: true,
          },
        ],
      });
    } else {
      productData = await Product.findAll();
    }

    return resUtil.successTrue({
      status: 200,
      message: '상품 목록 조회 성공',
      data: productData,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetProduct = withLogging(withAuth(postHandler));
