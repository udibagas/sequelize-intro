"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formattedPrice() {
      return this.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }

    getExpiredDate() {
      return this.expiredDate.toLocaleString("id-ID", {
        dateStyle: "medium",
      });
    }

    get status() {
      return this.available ? "AVAILABLE" : "OUT OF STOCK";
    }

    static summary() {
      return Food.findOne({
        raw: true,
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("*")), "jumlahMenu"],
          [sequelize.fn("MIN", sequelize.col("price")), "murah"],
          [sequelize.fn("MAX", sequelize.col("price")), "mahal"],
          [sequelize.fn("SUM", sequelize.col("stock")), "total"],
          [sequelize.fn("AVG", sequelize.col("price")), "avg"],
        ],
      });
    }

    static avg(column) {
      return Food.aggregate(column, "AVG");
    }

    async deleteOutOfStock(id) {
      if (this.available) {
        throw new Error("Stok masih ada. Ga boleh dihapus");
      }

      await this.destroy();
    }
  }

  Food.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      category: DataTypes.STRING,
      expiredDate: DataTypes.DATE,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );

  return Food;
};
