'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MenuItems.init({
    menuItemName: DataTypes.STRING,
    menuItemDescription: DataTypes.TEXT,
    menuItemPicture: DataTypes.STRING,
    menuItemPrice: DataTypes.INTEGER,
    menuItemPicture: DataTypes.STRING,
    menuItemType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuItems',
  });
  return MenuItems;
};