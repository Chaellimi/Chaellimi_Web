import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import { NextRequest } from 'next/server';
import resUtil from '@/lib/utils/responseUtil';
import { Product } from '@/database/models';

async function getHandler(req: NextRequest) {
  try {
    const productId = Number(req.nextUrl.pathname.split('/')[3]);
    if (!productId) {
      return resUtil.successFalse({
        status: 400,
        message: '상품 ID가 제공되지 않았습니다',
      });
    }

    const product = await Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 상품을 찾을 수 없습니다',
      });
    }

    return resUtil.successTrue({
      status: 200,
      message: '상품 조회 성공',
      data: product,
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

const GetProductById = withLogging(withAuth(getHandler));
export const GET = GetProductById;
