const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Answer = sequelize.define('Answer', {
        name: {
                type: DataTypes.STRING,
                allowNull: true

        },
        text: {
                type: DataTypes.TEXT,
                allowNull: false
        },

});

module.exports = Answer;
