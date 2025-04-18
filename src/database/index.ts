import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DEV_TYPE = process.env.DEV_TYPE;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DEV_TYPE) {
  throw new Error('Missing required database environment variables');
}

const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: DEV_TYPE === 'development' ? (msg) => console.log(msg) : false,
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log('✅ DB 연결 성공');

    if (process.env.DEV_TYPE !== 'production') {
      await sequelize.sync({ alter: true });
      // await sequelize.sync({ force: true }); // 테이블 초기화
    }
  })
  .catch((error) => {
    console.error('❌ DB 연결 실패:', error);
  });

export { sequelize };
