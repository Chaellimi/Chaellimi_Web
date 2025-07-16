import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Custody, Product } from '@/database/models';

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
      ],
    });

    console.log(custody);

    return resUtil.successTrue({
      status: 200,
      message: '보관함 조회 성공',
      data: { custody },
    });
  } catch (err) {
    console.log(err);
    return resUtil.unknownError({ data: { err } });
  }
}

const GetCustody = withLogging(withAuth(getHandler));
export const GET = GetCustody;
