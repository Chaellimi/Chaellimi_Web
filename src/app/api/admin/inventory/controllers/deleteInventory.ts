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
    const { productId, inventoryId } = body;

    if (!productId || !inventoryId) {
      return resUtil.successFalse({
        status: 400,
        message: '상품 ID와 재고 ID가 필요합니다.',
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

    const isInventoryAvailable = await Inventory.findOne({
      where: { id: inventoryId, productId: productId },
    });
    if (!isInventoryAvailable) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 재고를 찾을 수 없습니다',
      });
    }

    // 1. Custody 테이블에서 해당 productId를 가진 레코드들을 삭제
    await Custody.destroy({
      where: { productId: productId, inventoryId: inventoryId },
    });

    // 2. Inventory 테이블에서 해당 inventoryId 가진 레코드들을 삭제
    await Inventory.destroy({
      where: { productId: productId, id: inventoryId },
    });

    return resUtil.successTrue({
      status: 200,
      message: '재고 삭제 성공',
      data: { deletedInventoryId: inventoryId },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const DeleteAdminInventory = withLogging(withAuth(postHandler));
