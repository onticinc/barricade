'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Merch.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Merch',
  });
  return Merch;
};