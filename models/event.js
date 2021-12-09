'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Event.belongs(models.User, { foreignKey: 'userId' });
      models.Event.belongs(models.Game, { foreignKey: 'GameId' });
    }
  };
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    picture: DataTypes.STRING,
    date: DataTypes.DATE,
    notes: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};