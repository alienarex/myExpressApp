var express = require("express");
var app = express();
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "/tmp/" });
var fs = require("fs");
var bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/file_upload", function (req, res) {
  console.log(req.files.file.name);
  console.log(req.files.file.path);
  console.log(req.files.file.type);
  var file = __dirname + "/" + req.files.file.name;

  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.files.file.name,
        };
      }

      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
});
/* render view. */
router.get("/", function (req, res, next) {
  res.render("test", { title: "I rock!" });
});

// This responds a GET request for the /list_user page.
router.get("/list_user", function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send("Page Listing");
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
router.get("/ab*cd", function (req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send("Page Pattern Match");
});
// Form handling get request
router.get("/process_get", function (req, res) {
  console.log("GET request!");
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

// Form handling post request
router.post("/process_post", urlencodedParser, function (req, res) {
  console.log("POST request!");
  // Prepare output in JSON format
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

module.exports = router;
