const express = require("express");
const app = express();
const port = 3000;

// BENAR
const { Food } = require("./models");

app.get("/", async (req, res) => {
  try {
    const food = await Food.findAll();
    res.json(food);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
