'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Budgues', 'budget', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.addColumn('Budgues', 'spent', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    });
    
    await queryInterface.addColumn('Budgues', 'period_start', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.addColumn('Budgues', 'period_end', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Budgues', 'budget');
    await queryInterface.removeColumn('Budgues', 'spent');
    await queryInterface.removeColumn('Budgues', 'period_start');
    await queryInterface.removeColumn('Budgues', 'period_end');
  }
};
