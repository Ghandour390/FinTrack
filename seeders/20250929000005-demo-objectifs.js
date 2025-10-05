'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Objectif_financies', [
      {
        user_id: 1,
        name: 'Vacances été',
        montant_acible: 2000.00,
        montant_actual: 450.00,
        date_but: new Date('2024-07-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        name: 'Nouveau laptop',
        montant_acible: 1200.00,
        montant_actual: 300.00,
        date_but: new Date('2024-06-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        name: 'Fonds urgence',
        montant_acible: 5000.00,
        montant_actual: 1200.00,
        date_but: new Date('2024-12-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Objectif_financies', null, {});
  }
};