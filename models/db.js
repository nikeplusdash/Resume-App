require('dotenv').config()
const Sequelize = require('sequelize');
const options = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DATABASE,
    PORT: process.env.PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const sequelize = new Sequelize(options.DB, options.USER, options.PASSWORD, {
    host: options.HOST,
    port: options.PORT,
    dialect: options.dialect,
    operatorsAliases: 0,
    pool: {
        max: options.pool.max,
        min: options.pool.min,
        acquire: options.pool.acquire,
        idle: options.pool.idle
    },
    logging: false,
    define: {
        timestamps: false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.client = require('./client.model')(sequelize,Sequelize)
db.cvresume = require('./cvresume.model')(sequelize,Sequelize)
// db.otp = require('./otp.model')(sequelize,Sequelize)

module.exports = db;