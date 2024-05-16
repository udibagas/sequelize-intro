"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // const data = JSON.parse(fs.readFileSync("./data/foods.json", "utf-8"));
    // const data = require("../data/foods.json").map((el) => {
    //   delete el.id; // hapus id

    //   // tambahkan key baru
    //   el.createdAt = new Date();
    //   el.updatedAt = new Date();

    //   // jangan lupa return jika menggunakan map
    //   return el;
    // });

    const data = require("../data/foods.json");

    data.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });

    // console.log(data);

    await queryInterface.bulkInsert("Food", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Food", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
