const { Op } = require("sequelize");
const { Food, sequelize } = require("../models");

class Controller {
  static async home(req, res) {
    const { category, keyword } = req.query;

    const options = {
      order: [
        ["price", "asc"],
        ["name", "asc"],
      ],
      where: {},
    };

    if (category) {
      options.where.category = category;
    }

    if (keyword) {
      options.where.name = {
        [Op.iLike]: `%${keyword}%`,
      };
    }

    try {
      const food = await Food.findAll(options);
      const summary = await Food.summary();
      res.render("food", { food, ...summary });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async addFood(req, res) {
    try {
      res.render("addMenu");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async saveFood(req, res) {
    try {
      await Food.create(req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async showFood(req, res) {
    try {
      res.send("showFood");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async editFood(req, res) {
    try {
      const food = await Food.findByPk(req.params.id);
      res.render("editMenu", { food });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async updateFood(req, res) {
    const { name, price, stock, category, expiredDate } = req.body;

    try {
      const food = await Food.findByPk(req.params.id);
      // const food = await Food.update(
      //   { name, price, stock, category, expiredDate },
      //   { where: { id: req.params.id }, returning: true }
      // );
      await food.update({ name, price, stock, category, expiredDate });
      console.log(food); // affected rows
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async deleteFood(req, res) {
    try {
      // await Food.destroy({ where: { id: req.params.id } });
      const food = await Food.findByPk(req.params.id);
      if (!food) {
        throw new Error("Food not found");
      }

      await food.deleteOutOfStock();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async increaseStock(req, res) {
    try {
      const food = await Food.findByPk(req.params.id);
      if (!food) {
        throw new Error("Food not found");
      }
      await food.increment("stock", { by: 5 });
      // await Food.increment({ stock: 5 }, { where: { id: req.params.id } });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async decreaseStock(req, res) {
    try {
      const food = await Food.findByPk(req.params.id);
      if (!food) {
        throw new Error("Food not found");
      }
      await food.decrement({ stock: 5 });
      // await Food.decrement({ stock: 5 }, { where: { id: req.params.id } });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
