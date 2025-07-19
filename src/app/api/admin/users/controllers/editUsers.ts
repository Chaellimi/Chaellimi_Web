import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/middleware/withAuth';
import { withLogging } from '@/lib/middleware/withLogging';
import resUtil from '@/lib/utils/responseUtil';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { Point, Transactions, Users } from '@/database/models';

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
    const { userId, name, email, points, role, profileImg } = body;

    const isUserAvailable = await Users.findOne({
      where: { userId },
    });
    if (!isUserAvailable) {
      return resUtil.successFalse({
        status: 404,
        message: '해당 유저를 찾을 수 없습니다',
      });
    }

    // 유저 정보 업데이트
    await Users.update(
      { name, email, role, profileImg },
      {
        where: { userId },
      }
    );

    // 포인트 정보 업데이트
    if (points !== undefined) {
      const userPoint = await Point.findOne({ where: { userId } });

      if (!userPoint) {
        // 포인트 레코드가 없는 경우 새로 생성
        await Point.create({
          userId,
          totalPoint: points.toString(),
        });

        // 트랜잭션 기록 (포인트 지급)
        if (parseInt(points) > 0) {
          await Transactions.create({
            userId,
            type: 'deposit',
            amount: points.toString(),
            balance_after: points.toString(),
            description: '관리자에 의한 포인트 지급',
          });
        }
      } else {
        const currentPoints = parseInt(userPoint.totalPoint);
        const newPoints = parseInt(points);
        const difference = newPoints - currentPoints;

        // 포인트 업데이트
        await Point.update(
          { totalPoint: points.toString() },
          {
            where: { userId },
          }
        );

        // 포인트 변경이 있는 경우 트랜잭션 기록
        if (difference !== 0) {
          await Transactions.create({
            userId,
            type: difference > 0 ? 'deposit' : 'withdrawal',
            amount: Math.abs(difference).toString(),
            balance_after: points.toString(),
            description: `관리자에 의한 포인트 ${difference > 0 ? '지급' : '차감'}`,
          });
        }
      }
    }

    return resUtil.successTrue({
      status: 201,
      message: '유저 정보 수정 성공',
      data: {},
    });
  } catch (err) {
    return resUtil.unknownError({ data: { err } });
  }
}

export const EditAdminUsers = withLogging(withAuth(postHandler));
