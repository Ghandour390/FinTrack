'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Budgues', [
      {
        id: 1,
        name: 'Budget Alimentation',
        description: 'Budget mensuel pour les courses et restaurants',
        budget: 300.00,
        spent: 78.25,
        categorie_id: 1,
        user_id: 1,
        period_start: new Date('2024-01-01'),
        period_end: new Date('2024-01-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Budget Transport',
        description: 'Budget mensuel pour essence et transports publics',
        budget: 150.00,
        spent: 25.00,
        categorie_id: 2,
        user_id: 1,
        period_start: new Date('2024-01-01'),
        period_end: new Date('2024-01-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Budget Loisirs',
        description: 'Budget mensuel pour divertissement et hobbies',
        budget: 200.00,
        spent: 800.00,
        categorie_id: 3,
        user_id: 1,
        period_start: new Date('2024-01-01'),
        period_end: new Date('2024-01-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Budget Logement',
        description: 'Budget mensuel pour loyer et charges',
        budget: 1200.00,
        spent: 0.00,
        categorie_id: 4,
        user_id: 1,
        period_start: new Date('2024-01-01'),
        period_end: new Date('2024-01-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Budgues', null, {});
  }
};