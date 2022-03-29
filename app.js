//Ref: https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload"); // auto refresh
var liveReloadServer = livereload.createServer(); // auto refresh
var connectLiveReload = require("connect-livereload"); // auto refresh

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testRouter = require("./routes/test"); // TODO remove/rename?

liveReloadServer.server.once("connection", () => {
  // auto refresh
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
var app = express();

app.use(connectLiveReload()); // auto refresh

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/test", testRouter); // TODO remove test

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
