const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");
require("dotenv").config();

exports.sign_up_GET = function (req, res, next) {
  res.render("sign-up-form");
};

exports.sign_up_POST = [
  //sanitize values
  body("email")
    .trim()
    .isLength({ min: 1 })
    .escape()
    // .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      console.log(user === null);
      if (user !== null) {
        return Promise.reject();
      }
    })
    .withMessage("Account with that email already exists"),

  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      console.log(user === null);
      if (user !== null) {
        return Promise.reject();
      }
    })
    .withMessage("Username already exists"),

  body("password").trim().isLength({ min: 1 }).escape(),

  body("password_confirmation")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match"),

  //handle errors and handle route
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with errors
      res.render("sign-up-form.jade", { errors: errors.array() });
    } else {
      // If there are no errors, save the user and redirect to log-in

      let passedSecretCode = false;
      if (req.body.secret_code === process.env.secret_pass) {
        passedSecretCode = true;
      }
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        membershipStatus: passedSecretCode ? "Private" : "Basic",
      });

      await user.save();
      res.redirect("/log-in");
    }
  }),
];

exports.log_in_GET = function (req, res, next) {
  res.render("log-in-form.jade");
};

exports.log_in_POST = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.log_out_POST = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
