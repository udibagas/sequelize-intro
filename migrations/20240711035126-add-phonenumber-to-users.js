"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Users",
      "phoneNumber",
      Sequelize.STRING(20)
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "phoneNumber");
  },
};
