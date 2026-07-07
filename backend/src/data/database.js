const { Sequelize } = require('sequelize');

const sequelize = new Sequelize (
    'finance_db',
    'root',
    '',
{
    host: 'localhost',
    dialect: 'mysql'
}
);

module.exports = sequelize;
