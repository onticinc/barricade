'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MenuItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menuItemName: {
        type: Sequelize.STRING
      },
      menuItemDescription: {
        type: Sequelize.TEXT
      },
      menuItemPicture: {
        type: Sequelize.STRING
      },
      menuItemPrice: {
        type: Sequelize.INTEGER
      },
      menuItemPicture: {
        type: Sequelize.STRING
      },
      menuItemType: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MenuItems');
  }
};