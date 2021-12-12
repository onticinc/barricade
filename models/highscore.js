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
      models.HighScore.belongsTo(models.Game, { foreignKey: 'gameId' });
      models.HighScore.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  HighScore.init({
    highScore: DataTypes.INTEGER,
    initials: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HighScore',
  });
  return HighScore;
};