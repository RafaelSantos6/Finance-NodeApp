'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Relacionamento: Uma categoria possui várias despesas
      Category.hasMany(models.Expense, {
        foreignKey: 'categoriaId',
        as: 'despesas'
      });
    }
  }
  Category.init({
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });
  return Category;
};