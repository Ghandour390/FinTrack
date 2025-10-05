'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budgue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Budgue.belongsTo(models.Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
      Budgue.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Budgue.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    budget: DataTypes.DECIMAL(10, 2),
    spent: DataTypes.DECIMAL(10, 2),
    categorie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    period_start: DataTypes.DATE,
    period_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Budgue',
  });
  return Budgue;
};