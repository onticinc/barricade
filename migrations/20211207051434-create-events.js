'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      eventDescription: {
        type: Sequelize.TEXT
      },
      eventLink: {
        type: Sequelize.STRING
      },
      eventDescription: {
        type: Sequelize.STRING
      },
      eventCost: {
        type: Sequelize.INTEGER
      },
      eventPicture: {
        type: Sequelize.STRING
      },
      eventDate: {
        type: Sequelize.DATE
      },
      eventTime: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Events');
  }
};