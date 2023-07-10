import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env


// const sequelize = new Sequelize(POSTGRES_DB as string, POSTGRES_USER as string , POSTGRES_PASSWORD as string , {
//         host: POSTGRES_HOST,
//         dialect: 'postgres',
//        logging: false
//       });
const sequelize = new Sequelize('postgres://scouts_abu_sefen_db_user:LDefvKBL5PIRNcT10H2tHWSOYRhm5FJL@dpg-ciltqmunqqlfm4dcvkb0-a/scouts_abu_sefen_db', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {}, //removed ssl
  logging: false
});

export default sequelize
