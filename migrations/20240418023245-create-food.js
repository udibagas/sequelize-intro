"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
      id: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // SERIAL
        primaryKey: true, // PRIMARY KEY
        type: Sequelize.INTEGER, // INTEGER
      },
      name: {
        type: Sequelize.STRING(50), // VARCHAR(50)
        allowNull: false,
        unique: true, // UNIQUE
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // DEFAULT 0
      },
      category: {
        type: "VARCHAR(30)",
        allowNull: false,
      },
      expiredDate: {
        type: Sequelize.DATE, // TIMESTAMP WITH TIME ZONE
        allowNull: false,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Food");
  },
};
