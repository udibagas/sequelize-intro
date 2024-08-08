"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/foods.json");

    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Food", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
