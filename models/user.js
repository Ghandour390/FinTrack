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
      User.hasMany(models.Objectif_financies, { foreignKey: 'user_id', as: 'objectifs' });
      User.hasMany(models.Categorie, { foreignKey: 'user_id', as: 'categories' });
      User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
      User.hasMany(models.Budgue, { foreignKey: 'user_id', as: 'budgets' });
    }
  }
  User.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    restPasswordToken: DataTypes.STRING,
    restPasswordExpires: DataTypes.DATE,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};