import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import { NextRequest } from 'next/server';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Inventory, Product, Users } from '@/database/models';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import { InventoryType } from '../Inventory.type';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, imgURL, expiration }: InventoryType = body;

    const user = await getUserFromRequest();

    if (!user) {
      return resUtil.unauthorized({});
    }

    const userRole = await Users.findOne({ where: { userId: user?.id } });

    if (userRole?.dataValues.role === 'user') {
      return resUtil.successTrue({
        status: 403,
        message: '어드민 권한이 없습니다.',
      });
    }

    const validationResponse = validateRequiredFields(body, [
      'productId',
      'imgURL',
      'expiration',
    ]);

    if (validationResponse) return validationResponse;

    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return resUtil.successFalse({
        status: 404,
        message: `productId ${productId}에 해당하는 상품이 존재하지 않습니다.`,
        data: {},
      });
    }

    const newInventory = await Inventory.create({
      productId,
      imgURL,
      isSold: false,
      isUse: false,
      expiration,
    });

    return resUtil.successTrue({
      status: 201,
      message: '상품 재고 생성 성공',
      data: newInventory,
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

export const CreateInventory = withLogging(withAuth(postHandler));
