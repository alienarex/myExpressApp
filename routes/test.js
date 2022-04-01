var express = require("express");
var router = express.Router();
// Uploading
var multer = require("multer");
var upload = multer({ dest: "/tmp/" });
var fs = require("fs");
var bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * Render view. Adding page title
 */
router.get("/", function (req, res, next) {
  res.render("test", { title: "I rock!", menu: "test" });
});

/**
 * Get file from form and upload it to relative path ./uploads
 */
router.post("/upload", upload.single("file_upload"), function (req, res) {
  var file = "./uploads" + "/" + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.file.originalname,
          path: file,
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
});

/**
 * This responds a GET request for the /list_user page.
 */
router.get("/list_user", function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send("Page Listing");
});

/**
 * This responds a GET request for abcd, abxcd, ab123cd, and so on
 */
router.get("/ab*cd", function (req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send("Page Pattern Match");
});

/**
 * This responds a GET request from form
 */
router.get("/process_get", function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  // console.log(response);
  res.end(JSON.stringify(response));
});

/**
 * This responds a POST request from form
 */
router.post("/process_post", urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  // console.log(response);
  res.end(JSON.stringify(response));
});

module.exports = router;
