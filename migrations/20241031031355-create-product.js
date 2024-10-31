"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // akan dijalakan ketika menjalankan perintah npx sequelize db:migrate
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // SERIAL
        primaryKey: true, // PRIMARY KEY
        type: Sequelize.INTEGER, // INTEGER
      },
      name: {
        type: Sequelize.STRING(100), // VARCHAR(100)
        allowNull: false, // NOT NULL
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  // npx sequelize db:migrate:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
