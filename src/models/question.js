const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Question = sequelize.define('Question', {
        id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
        },
        description: {
                type: DataTypes.STRING,
                allowNull: false
        }
});

module.exports = Question;
