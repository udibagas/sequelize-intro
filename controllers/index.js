const { Op } = require("sequelize");
const { Food } = require("../models");

class Controller {
  static async getAllFood(req, res) {
    const { q, order } = req.query;

    const options = {
      where: {},
      order: [["name", "asc"]],
    };

    if (q) {
      options.where.name = {
        [Op.iLike]: `%${q}%`,
      };
    }

    if (order && ["asc", "desc"].includes(order)) {
      options.order = [["price", order]];
    }

    try {
      const food = await Food.findAll(options);
      res.render("food", { food });
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = Controller;
