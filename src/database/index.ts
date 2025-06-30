import { sequelize } from './sequelize';

import './models/Challenge';
import './models/ChallengeParticipants';
import './models/File';
import './models/Point';
import './models/Transactions';
import './models/User';
import './models/CertificationLog';
import './models/index';

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB 연결 성공');

    await sequelize.sync({ alter: true });
    console.log('✅ 모델 동기화 완료');
  } catch (error) {
    console.error('❌ DB 연결 또는 동기화 실패');
    console.error(error);
  }
};
