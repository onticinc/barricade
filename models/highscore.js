'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HighScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Game.belongsTo(models.User, { foreignKey: 'userId' });
      models.Game.belongsTo(models.Event, { foreignKey: 'eventId' });
      models.Event.hasMany(models.Event, { foreignKey: 'eventId' });
    }
  };
  HighScore.init({
    highScore: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HighScore',
  });
  return HighScore;
};