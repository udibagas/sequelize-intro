"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // npx sequelize db:seed
  async up(queryInterface, Sequelize) {
    const data = require("../data/products.json");

    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });

    // console.log(data);

    await queryInterface.bulkInsert("Products", data);
  },

  //npx sequelize db:seed:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
