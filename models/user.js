'use strict';
const bcrypt = require('bcryptjs');
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

  }, {
    sequelize,
    modelName: 'User',
  });

  // Before a user is created, we are encrypting the password and using hash in its place
  User.addHook('beforeCreate', (pendingUser) => { // pendingUser is user object that gets passed to DB
    // Bcrypt is going to hash the password
    let hash = bcrypt.hashSync(pendingUser.password, 12); // hash 12 times
    pendingUser.password = hash; // this will go to the DB
  });

  // Check the password on Sign-In and compare it to the hashed password in the DB
  User.prototype.validPassword = function (typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); // check to see if password is correct.

    return isCorrectPassword;
  }

  // return an object from the database of the user without the encrypted password
  User.prototype.toJSON = function () {
    let userData = this.get();
    delete userData.password; // it doesn't delete password from database, only removes it. 

    return userData;
  }





  return User;
};


