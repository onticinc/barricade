'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Game.hasMany(models.User, { foreignKey: 'userId' });
      models.Game.hasMany(models.Event, { foreignKey: 'eventId' });
    }
  };
  Game.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    notes: DataTypes.TEXT,
    picture: DataTypes.STRING,
    highScore: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};