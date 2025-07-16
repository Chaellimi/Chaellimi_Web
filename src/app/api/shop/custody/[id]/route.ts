import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Custody, Product, Inventory } from '@/database/models';
import { NextRequest } from 'next/server';

async function getHandler(req: NextRequest) {
  try {
    const custodyId = Number(req.nextUrl.pathname.split('/')[4]);

    if (!custodyId) {
      return resUtil.successFalse({
        status: 400,
        message: '보관함 ID가 제공되지 않았습니다',
      });
    }

    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    // 특정 보관함 항목 조회 (사용자 소유권 확인)
    const custody = await Custody.findOne({
      where: {
        id: custodyId,
        userId: user.id,
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
        {
          model: Inventory,
          as: 'inventory',
        },
      ],
    });

    if (!custody) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 보관함 항목을 찾을 수 없거나 접근 권한이 없습니다',
      });
    }

    const custodyData = custody.toJSON();

    // 사용 여부 확인
    let isUsed = false;
    if (
      'inventory' in custodyData &&
      custodyData.inventory &&
      typeof custodyData.inventory === 'object'
    ) {
      const inventory = custodyData.inventory as { isUse?: boolean };
      isUsed = inventory.isUse || false;
    }

    return resUtil.successTrue({
      status: 200,
      message: '보관함 상세 조회 성공',
      data: {
        custody: custodyData,
        isUsed,
      },
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

const GetCustody = withLogging(withAuth(getHandler));
export const GET = GetCustody;
