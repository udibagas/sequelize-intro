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

    get priceInRupiah() {
      return this.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }

    getFormattedExpiredDate() {
      return this.expiredDate.toLocaleString("id-ID", {
        dateStyle: "medium",
      });
    }

    get statusLabel() {
      return this.available ? "Masih" : "Habis";
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
