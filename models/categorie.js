'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  
      Categorie.hasMany(models.Transaction, { foreignKey: 'categorie_id', as: 'transactions' });
      Categorie.hasOne(models.Budgue, { foreignKey: 'categorie_id', as: 'budget' });
    }
  }
  Categorie.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};