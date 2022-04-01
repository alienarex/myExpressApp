var express = require("express");
// const { render } = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "I rock!", menu: "index" });
});

// // define the about route
router.get("/about", function (req, res) {
  res.render("about");
});

/**
 * URL parameters
 */
router.param("name", function (req, res, next, name) {
  const modified = name.toUpperCase();
  req.name = modified;
  next();
});

/**
 * GET request name using URL
 * @param name
 */
router.get("/api/users/:name", function (req, res) {
  res.send("Hello " + req.name + "!");
});

/**
 * Using body for posting user info
 * i.e. from form
 */
router.post("/api/users", function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  res.send({
    user_id: user_id,
    token: token,
    geo: geo,
  });
});
module.exports = router;
