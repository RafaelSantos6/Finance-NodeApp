'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Category extends Model {

    static associate(models) {

      Category.hasMany(models.Expense, {
        foreignKey: 'categoriaId',
        as: 'despesas'
      });

    }
  }

  Category.init({

    nome: DataTypes.STRING,
    descricao: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });

  return Category;
};