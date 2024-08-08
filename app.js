const express = require("express");
const { getAllFood } = require("./controllers");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.get("/", getAllFood);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
