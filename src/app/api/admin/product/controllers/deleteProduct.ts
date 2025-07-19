import { Product, Users, Inventory, Custody } from '@/database/models';
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
    const { productId } = body;

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

    // 1. Custody 테이블에서 해당 productId를 가진 레코드들을 삭제
    await Custody.destroy({
      where: { productId: productId },
    });

    // 2. Inventory 테이블에서 해당 productId를 가진 레코드들을 삭제
    await Inventory.destroy({
      where: { productId: productId },
    });

    // 3. Product 테이블에서 해당 상품을 삭제
    await Product.destroy({
      where: { id: productId },
    });

    return resUtil.successTrue({
      status: 200,
      message: '상품 삭제 성공',
      data: { deletedProductId: productId },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const DeleteAdminProduct = withLogging(withAuth(postHandler));
