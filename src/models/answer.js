const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Question = require('./question');

const Answer = sequelize.define('Answer', {
        id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
        },
        name: {
                type: DataTypes.STRING,
                allowNull: true
        },
        text: {
                type: DataTypes.TEXT,
                allowNull: false
        },
});

// Define the association without letting Sequelize generate foreign key constraints
Answer.belongsTo(Question, { foreignKey: 'questionId', constraints: false });

module.exports = Answer;
