'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Each transaction belongs to one user and one category
      Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Transaction.belongsTo(models.Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    categorie_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    montant: DataTypes.FLOAT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};