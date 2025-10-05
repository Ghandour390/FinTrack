'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", saltRounds);
    
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: 'ghandour',
        lastName: 'abdlhak',
        email: 'ghandour.abdlhak@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'ahmed',
        lastName: 'abdlhak',
        email: 'ahmed.abdlhak@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
