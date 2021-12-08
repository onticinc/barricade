'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wine.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    winery: DataTypes.STRING,
    pricePerGlass: DataTypes.INTEGER,
    pricePerBottle: DataTypes.INTEGER,
    abv: DataTypes.INTEGER,
    ava: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Wine',
  });
  return Wine;
};