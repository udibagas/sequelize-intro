"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //! dijalankan ketika menjalankan command db:migrate
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
      id: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // SERIAL
        primaryKey: true, // PRIMARY KRY
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50), // VARCHAR(50)
        allowNull: false, // NOT NULL
        unique: true, // UNIQUE
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: "VARCHAR(30)",
        allowNull: false,
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  //! dijalankan ketika menjalankan command db:migrate:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Food");
  },
};
