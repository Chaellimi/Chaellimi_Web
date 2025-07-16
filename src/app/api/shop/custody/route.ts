import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Custody, Product, Inventory } from '@/database/models';

async function getHandler() {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    const custody = await Custody.findAll({
      where: { userId: user.id },
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

    const custodyData = custody.map((item) => item.toJSON());

    const activeCustody = custodyData.filter((item) => {
      if (
        'inventory' in item &&
        item.inventory &&
        typeof item.inventory === 'object'
      ) {
        const inventory = item.inventory as { isUse?: boolean };
        return !inventory.isUse;
      }
      return true;
    });

    const usedCustody = custodyData.filter((item) => {
      if (
        'inventory' in item &&
        item.inventory &&
        typeof item.inventory === 'object'
      ) {
        const inventory = item.inventory as { isUse?: boolean };
        return inventory.isUse;
      }
      return false;
    });

    return resUtil.successTrue({
      status: 200,
      message: '보관함 조회 성공',
      data: {
        activeCustody,
        usedCustody,
        totalCount: custodyData.length,
        activeCount: activeCustody.length,
        usedCount: usedCustody.length,
      },
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

const GetCustody = withLogging(withAuth(getHandler));
export const GET = GetCustody;
