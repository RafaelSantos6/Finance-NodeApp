'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Expense, {
        foreignKey: 'usuarioId',
        as: 'despesas'
      });
    }
  }
  User.init({
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};