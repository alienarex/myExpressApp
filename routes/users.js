var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  //TODO implement this
  // res.render("users", {title:"Users", menu:"users"});
  res.send("respond with a resource");
});

module.exports = router;
