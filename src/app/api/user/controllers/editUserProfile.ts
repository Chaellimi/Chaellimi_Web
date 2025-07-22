import { Users } from '@/database/models';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import resUtil from '@/lib/utils/responseUtil';
import { validateRequiredFields } from '@/lib/utils/validateRequiredFields';
import { NextRequest } from 'next/server';

async function postHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, profileImg }: { name: string; profileImg: string } = body;

    const validationResponse = validateRequiredFields(body, [
      'name',
      'profileImg',
    ]);

    if (validationResponse) return validationResponse;

    const user = await getUserFromRequest();
    if (!user) {
      return resUtil.unauthorized({});
    }

    await Users.update(
      {
        name,
        profileImg,
      },
      {
        where: { userId: user.id },
      }
    );

    return resUtil.successTrue({
      status: 201,
      message: '프로필 수정 성공',
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const EditUser = withLogging(withAuth(postHandler));
