'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      // Dépenses
      {
        id: 1,
        categorie_id: 1,
        user_id: 1,
        date: new Date('2024-01-15'),
        montant: 45.50,
        type: 'depense',
        description: 'Courses au supermarché',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        categorie_id: 2,
        user_id: 1,
        date: new Date('2024-01-16'),
        montant: 25.00,
        type: 'depense',
        description: 'Essence voiture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        categorie_id: 1,
        user_id: 1,
        date: new Date('2024-01-17'),
        montant: 32.75,
        type: 'depense',
        description: 'Restaurant avec amis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        categorie_id: 3,
        user_id: 1,
        date: new Date('2024-01-01'),
        montant: 800.00,
        type: 'depense',
        description: 'Achat équipement sport',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Revenus
      {
        id: 5,
        categorie_id: null,
        user_id: 1,
        date: new Date('2024-01-01'),
        montant: 3500.00,
        type: 'revenu',
        description: 'Salaire mensuel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        categorie_id: null,
        user_id: 1,
        date: new Date('2024-01-15'),
        montant: 150.00,
        type: 'revenu',
        description: 'Freelance projet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        categorie_id: null,
        user_id: 2,
        date: new Date('2024-01-01'),
        montant: 2800.00,
        type: 'revenu',
        description: 'Salaire mensuel',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};