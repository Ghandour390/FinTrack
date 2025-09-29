'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
      User.hasMany(models.Budgue, { foreignKey: 'user_id', as: 'budgets' });
      User.hasMany(models.Objectif_financies, { foreignKey: 'user_id', as: 'objectifs' });
    }
  }
  User.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};