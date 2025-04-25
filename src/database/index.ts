import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'mysql',
    dialectModule: mysql2,
    logging:
      process.env.DEV_TYPE === 'development'
        ? (msg) => console.log(msg)
        : false,
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log('-------------------- ✅ DB 연결 성공 --------------------');

    if (process.env.DEV_TYPE !== 'production') {
      // await sequelize.sync({ alter: true }); // 테이블 변경
      // await sequelize.sync({ force: true }); // 테이블 초기화
    }
  })
  .catch((error) => {
    console.error('-------------------- ❌ DB 연결 실패 --------------------');
    console.log(error);
    console.log('------------------------------------------------');
  });

export { sequelize };
