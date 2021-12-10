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
      models.Event.hasMany(models.Game, { foreignKey: 'eventId' });
      models.Event.belongsTo(models.User, { foreignKey: 'userId' });
      models.Event.belongsTo(models.HighScore, { foreignKey: 'highScoreId' });
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