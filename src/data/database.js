const { Sequelize } = require('sequelize');

const sequilize = new Sequelize (
    'finace_db',
    'root',
    '',
{
    host: 'localhost',
    dialect: 'mysql'
}
);

module.exports = sequilize;
