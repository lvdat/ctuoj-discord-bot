const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:', {
    logging: console.log,
})
connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 

const User = sequelize.define("user", {
    discord_id: DataTypes.INTEGER, // uid discord
    ctuoj_username: DataTypes.TEXT,
})

const Hash = sequelize.define("hash", {
    ctuoj_username: DataTypes.TEXT,
    ctuoj_hash: DataTypes.TEXT,
})

// connect()
(async () => {
    await sequelize.sync({ force: true });
    // Code here
})()