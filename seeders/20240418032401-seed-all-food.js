"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/takjil.json").map((el) => {
      el.status = el.available;
      delete el.id;
      delete el.available;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Food", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
