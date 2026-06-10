'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      descricao: { type: Sequelize.STRING, allowNull: false },
      valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      data: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.ENUM('PENDENTE', 'PAGA'), defaultValue: 'PENDENTE' },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' }, // Chave estrangeira
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }, // Chave estrangeira | Relacionamento é dificil
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses');
  }
};