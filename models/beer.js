'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Beer.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    brewery: DataTypes.STRING,
    pricePerGlass: DataTypes.INTEGER,
    pricePerGrowler: DataTypes.INTEGER,
    costPerKeg: DataTypes.INTEGER,
    abv: DataTypes.INTEGER,
    ibu: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Beer',
  });
  return Beer;
};