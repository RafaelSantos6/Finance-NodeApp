'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        nome: 'Alimentação',
        descricao: 'Gastos com mercado, padaria, restaurantes, etc.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Transporte',
        descricao: 'Combustível, passagens, aplicativos de transporte.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Moradia',
        descricao: 'Aluguel, contas de luz, água, internet.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};