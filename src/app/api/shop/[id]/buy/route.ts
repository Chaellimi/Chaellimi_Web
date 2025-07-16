import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import {
  Custody,
  Inventory,
  Point,
  Product,
  Transactions,
} from '@/database/models';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';

async function getHandler(req: NextRequest) {
  try {
    // 상품 ID 추출
    const productId = Number(req.nextUrl.pathname.split('/')[3]);
    if (!productId) {
      return resUtil.successFalse({
        status: 400,
        message: '상품 ID가 제공되지 않았습니다',
      });
    }

    // 상품 확인
    const product = await Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 상품을 찾을 수 없습니다',
      });
    }

    // 유저 확인
    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    // 재고 확인 (만료일자 순서, 같으면 id 순서로 정렬)
    const inventory = await Inventory.findAll({
      where: {
        productId,
        isSold: false,
      },
      order: [
        ['expiration', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    if (inventory.length === 0) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 상품의 재고가 없습니다',
      });
    }

    // 포인트 확인
    const point = await Point.findOne({
      where: { userId: user.id },
    });
    if (!point || Number(point.totalPoint) < Number(product.price)) {
      return resUtil.successFalse({
        status: 400,
        message: '포인트가 부족합니다',
      });
    }

    // 구매 처리
    const targetInventory = inventory[0];

    const currentPoint = Number(point.totalPoint);
    const productPrice = Number(product.price);
    const remainingPoint = currentPoint - productPrice;

    // 재고 상태 업데이트
    await targetInventory.update({
      isSold: true,
    });

    // 포인트 차감
    await point.update({
      totalPoint: String(remainingPoint),
    });

    // 거래 로그 생성
    await Transactions.create({
      userId: user.id,
      type: 'withdrawal',
      amount: productPrice.toString(),
      balance_after: remainingPoint.toString(),
      description: `상품 구매: ${product.title} (${product.brand})`,
    });

    // 보관함 생성
    await Custody.create({
      userId: user.id,
      productId: product.id,
      inventoryId: targetInventory.id,
    });

    return resUtil.successTrue({
      status: 200,
      message: '상품 구매 성공',
      data: {
        product,
        purchasedInventory: targetInventory,
        remainingPoint,
      },
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const BuyProduct = withLogging(withAuth(getHandler));
export const POST = BuyProduct;
