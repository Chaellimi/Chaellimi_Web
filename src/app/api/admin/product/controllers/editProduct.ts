import { ProductType } from '@/app/api/shop/Product.type';
import { Product, Users } from '@/database/models';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { NextRequest } from 'next/server';

async function postHandler(req: NextRequest) {
  try {
    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 400,
        message: '어드민 권한이 없습니다.',
      });
    }

    const body = await req.json();
    const {
      productId,
      category,
      imgURL,
      brand,
      price,
      title,
      explanation,
    }: ProductType = body;

    if (!productId) {
      return resUtil.successFalse({
        status: 400,
        message: '상품 ID가 필요합니다.',
      });
    }

    const isProductAvailable = await Product.findOne({
      where: { id: productId },
    });
    if (!isProductAvailable) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 상품을 찾을 수 없습니다',
      });
    }

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
    if (!categoryType.includes(category)) {
      return resUtil.successTrue({
        status: 400,
        message:
          '카테고리 타입이 잘못되었습니다. 타입은 cafe, pizza, chicken, dessert, burger, store, coupon 중 하나여야 합니다.',
      });
    }

    await Product.update(
      {
        category,
        imgURL,
        brand,
        price,
        title,
        explanation,
      },
      {
        where: { id: productId },
      }
    );

    return resUtil.successFalse({
      status: 200,
      message: '상품 정보 수정 성공',
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const EditAdminProduct = withLogging(withAuth(postHandler));
