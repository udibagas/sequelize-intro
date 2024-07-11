"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  //! akan di execute waktu menjalankan command sequelize db:migrate
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, // PRIMARY KEY
        type: Sequelize.INTEGER, // SERIAL
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(30), // VARCHAR(30)
        // allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50), // VARCHAR(50)
        allowNull: false,
        unique: true, // UNIQUE
      },
      gender: {
        type: "CHAR(1)",
        allowNull: false,
      },
      dateOfBirth: {
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
  //! akan di execute waktu menjalankan command sequelize db:migrate:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
