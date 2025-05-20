import './associations'; // 🔁 관계 정의 분리
import { sequelize } from './sequelize';

sequelize
  .authenticate()
  .then(async () => {
    console.log('-------------------- ✅ DB 연결 성공 --------------------');
    await sequelize.sync({ alter: true });
  })
  .catch((error) => {
    console.error('-------------------- ❌ DB 연결 실패 --------------------');
    console.log(error);
  });
