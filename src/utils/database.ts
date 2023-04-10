import safeConfig from "./env";
import { Sequelize } from 'sequelize';


export default new Sequelize(safeConfig.DB_NAME, safeConfig.DB_USER, safeConfig.DB_PASSWORD, {
	host: safeConfig.DB_HOST || 'localhost',
	dialect: 'postgres',
	logging: false,
});