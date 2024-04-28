const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatbot', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        password: 'fF1122334455'
});

module.exports = sequelize;

