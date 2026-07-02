'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Expense extends Model {

    static associate(models) {

      Expense.belongsTo(models.User, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });

      Expense.belongsTo(models.Category, {
        foreignKey: 'categoriaId',
        as: 'categoria'
      });
    }
  }

  Expense.init({

    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },

    valor: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        'PENDENTE',
        'PAGA'
      ),
      defaultValue: 'PENDENTE'
    },

    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
  });

  return Expense;
};