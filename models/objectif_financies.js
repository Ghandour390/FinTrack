'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objectif_financies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      Objectif_financies.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Objectif_financies.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    montant_acible: DataTypes.FLOAT,
    montant_actual: DataTypes.FLOAT,
    date_but: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Objectif_financies',
  });
  return Objectif_financies;
};