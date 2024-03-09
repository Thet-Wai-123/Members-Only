var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
require("dotenv").config();

var app = express();
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//set up session
const session = require("express-session");
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

//setting up passport
require("./config/passport");
app.use;
passport.initialize()
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//setting up routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var clubRouter = require("./routes/club");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/club", clubRouter);

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.mongodb_String;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

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
