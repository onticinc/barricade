'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Event, { foreignKey: 'userId' });
      models.User.hasMany(models.Game, { foreignKey: 'userId' });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    initials: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userLevel: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};