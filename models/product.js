"use strict";
const { Model, fn, col } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models = { Product: Product }
      // define association here
    }

    get formattedPrice() {
      return this.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }

    getLastUpdate() {
      return this.updatedAt.toLocaleString("id-ID", {
        dateStyle: "medium",
      });
    }

    get statusLabel() {
      return this.status ? "Available" : "Discountinued";
    }

    static avg() {
      return Product.aggregate("price", "avg");
    }

    static summary() {
      return Product.findOne({
        raw: true,
        attributes: [
          [fn("MIN", col("price")), "minPrice"],
          [fn("MAX", col("price")), "maxPrice"],
          [fn("ROUND", fn("AVG", col("price"))), "avgPrice"],
          [fn("SUM", col("stock")), "totalStock"],
        ],
      });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
