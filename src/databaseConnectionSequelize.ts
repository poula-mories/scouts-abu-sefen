import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env


const sequelize = new Sequelize(POSTGRES_DB as string, POSTGRES_USER as string , POSTGRES_PASSWORD as string , {
        host: POSTGRES_HOST,
        dialect: 'postgres',
        logging: false
      });

export default sequelize