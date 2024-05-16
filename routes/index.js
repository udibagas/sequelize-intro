const {
  home,
  addFood,
  saveFood,
  showFood,
  editFood,
  updateFood,
  deleteFood,
  increaseStock,
  decreaseStock,
} = require("../controllers");
const router = require("express").Router();

router.get("/", home); // menampilkan list food
router.get("/add", addFood); // menampilkan form add food
router.post("/add", saveFood); // menyimpan food ke database
router.get("/:id", showFood); // menampilkan data food berdasarkan id
router.get("/edit/:id", editFood); // menampilkan form edit food
router.post("/edit/:id", updateFood); // mengupdate data food
router.get("/delete/:id", deleteFood); // menghapus data food
router.get("/increase-stock/:id", increaseStock); // menghapus data food
router.get("/decrease-stock/:id", decreaseStock); // menghapus data food

module.exports = router;
