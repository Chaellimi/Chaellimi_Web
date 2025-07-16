import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Product, Users, Inventory } from '@/database/models';
import { sequelize } from '@/database/sequelize';
import { NextRequest } from 'next/server';

async function postHandler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const categoryParam = searchParams.get('category');

    const categoryType = [
      'cafe',
      'pizza',
      'chicken',
      'dessert',
      'burger',
      'dessert',
      'store',
      'coupon',
    ];

    if (categoryParam && !categoryType.includes(categoryParam)) {
      return resUtil.successTrue({
        status: 400,
        message:
          '카테고리 타입이 잘못되었습니다. 타입은 cafe, pizza, chicken, dessert, burger, store, coupon 중 하나여야 합니다.',
      });
    }

    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    let productData;

    if (userRole?.dataValues.role === 'user') {
      const whereCondition = categoryParam ? { category: categoryParam } : {};

      productData = await Product.findAll({
        where: whereCondition,
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
      });
    } else {
      const whereCondition = categoryParam ? { category: categoryParam } : {};
      productData = await Product.findAll({
        where: whereCondition,
      });
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
