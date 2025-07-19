import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Product, Users, Inventory } from '@/database/models';
import { sequelize } from '@/database/sequelize';

async function postHandler() {
  try {
    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 400,
        message: '어드민 권한이 없습니다.',
      });
    }

    const productData = await Product.findAll({
      include: [
        {
          model: Inventory,
          as: 'inventories',
          where: {
            isSold: false,
            isUse: false,
          },
          attributes: [],
          required: true,
        },
      ],
      attributes: [
        'id',
        'category',
        'imgURL',
        'brand',
        'price',
        'title',
        'explanation',
        'createdAt',
        'updatedAt',
        [
          sequelize.fn('COUNT', sequelize.col('inventories.id')),
          'inventoryCount',
        ],
      ],
      group: ['Product.id'],
      order: [['id', 'ASC']],
    });

    return resUtil.successTrue({
      status: 200,
      message: '상품 목록 조회 성공',
      data: productData,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const GetAdminProduct = withLogging(withAuth(postHandler));
