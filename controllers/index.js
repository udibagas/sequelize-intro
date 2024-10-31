const { fn, col, Op, where } = require("sequelize");
const { Product } = require("../models");

exports.products = async (req, res) => {
  const { keyword, status } = req.query;

  const options = {
    order: [["name", "asc"]],
    where: {},
  };

  if (keyword) {
    options.where.name = {
      [Op.iLike]: `%${keyword}%`,
    };
  }

  if (status) {
    options.where.status = status;
  }

  try {
    const products = await Product.findAll(options);

    const totalProduct = await Product.count({
      where: {
        status: true,
      },
    });

    const summary = await Product.summary();

    res.render("products", {
      products,
      totalProduct,
      summary,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    res.render("addProduct");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.saveProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.render("editProduct", { product });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    // await Product.update(req.body, {
    //   where: { id: req.params.id },
    // });

    await product.update(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.status) {
      throw new Error("Available product can not be deleted");
    }

    // await Product.destroy({
    //   where: { id: req.params.id },
    // });

    await product.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.showProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.buyProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock == 0) {
      throw new Error("Out of stock!");
    }

    // await Product.decrement("stock", {
    //   where: { id: req.params.id },
    // });

    await product.decrement("stock");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
