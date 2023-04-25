var express = require("express");
var {
  createCar,
  allcars,
  getByName,
  insertmany,
} = require("../controllers/car");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/allcars", allcars);
router.post("/create", createCar);
router.get("/:name", getByName);
router.post("/insertmany", insertmany);

module.exports = router;
