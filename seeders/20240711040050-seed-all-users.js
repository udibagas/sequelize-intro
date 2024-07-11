"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // ! sequelize db:seed
  async up(queryInterface, Sequelize) {
    const data = require("../data/users.json").map((el) => {
      const { id, first_name: firstName, last_name: lastName, ...rest } = el;
      return {
        firstName,
        lastName,
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Users", data);
  },

  // ! sequelize db:seed:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
