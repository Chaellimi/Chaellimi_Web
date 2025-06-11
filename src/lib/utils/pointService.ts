import { sequelize } from '@/database/sequelize';
import Point from '@/database/models/Point';
import Transactions from '@/database/models/Transactions';
import resUtil from './responseUtil';

export async function modifyPoint({
  userId,
  amount,
  type,
  description,
}: {
  userId: number;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
}) {
  return await sequelize.transaction(async (t) => {
    let point = await Point.findOne({ where: { userId }, transaction: t });

    if (!point) {
      point = await Point.create(
        { userId, totalPoint: '0' },
        { transaction: t }
      );
    }

    let newBalance = parseInt(point.totalPoint, 10);

    if (type === 'deposit') {
      newBalance += amount;
    } else {
      if (newBalance < amount) {
        return resUtil.successFalse({
          message: '포인트 잔액이 부족합니다.',
          status: 400,
        });
      }
      newBalance -= amount;
    }

    point.totalPoint = newBalance.toString();
    await point.save({ transaction: t });

    await Transactions.create(
      {
        userId,
        type,
        amount: amount.toString(),
        balance_after: newBalance.toString(),
        description,
      },
      { transaction: t }
    );

    return point;
  });
}
