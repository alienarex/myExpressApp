var express = require("express");
// const { render } = require("../app");
var router = express.Router();

/* GET page. */
router.get("/", function (req, res, next) {
  console.log("About trigged");
  res.render("about", { title: "I rock!", menu: "about" });
});
module.exports = router;
