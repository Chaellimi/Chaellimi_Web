import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import { NextRequest } from 'next/server';
import { ProductType } from '../Product.type';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Product, Users } from '@/database/models';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, imgURL, brand, price, title, explanation }: ProductType =
      body;

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

    const user = await getUserFromRequest();
    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 400,
        message: '어드민 권한이 없습니다.',
      });
    }

    const validationResponse = validateRequiredFields(body, [
      'category',
      'imgURL',
      'brand',
      'price',
      'title',
      'explanation',
    ]);

    if (validationResponse) return validationResponse;

    if (!user) {
      return resUtil.unauthorized({});
    }

    const newProduct = await Product.create({
      category,
      imgURL,
      brand,
      price,
      title,
      explanation,
    });

    return resUtil.successTrue({
      status: 201,
      message: '상품 생성 성공',
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const CreateProduct = withLogging(withAuth(postHandler));
