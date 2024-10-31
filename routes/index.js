const {
  products,
  addProduct,
  saveProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  showProduct,
  buyProduct,
} = require("../controllers");
const router = require("express").Router();

router.get("/", products); // menampilkan list products
router.get("/products/add", addProduct); // form add product
router.post("/products/add", saveProduct); // save new product
router.get("/products/:id", showProduct); // get product by id
router.get("/products/:id/edit", editProduct); // form edit product
router.post("/products/:id/edit", updateProduct); // update product
router.get("/products/:id/delete", deleteProduct); // delete product
router.get("/products/:id/buy", buyProduct); // buy product

module.exports = router;
