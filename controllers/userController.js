const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

exports.sign_up_GET = function (req, res, next) {
  res.render("sign-up-form");
};

exports.sign_up_POST = [
  //sanitize values
  body("email").trim().isLength({ min: 1 }).escape(),
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      email: req.body.email, //use oneOf to server side check that it's a vlaid mail
      username: req.body.username,
      password: req.body.password,
    });
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with errors
      res.render("sign-up-form", { errors: errors.array() });
    } else {
      // If there are no errors, save the user and redirect to log-in
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      await user.save();
      res.redirect("/log-in");
    }
  }),
];



exports.log_in_GET = function (req, res, next) {
  res.render("log-in-form");
};

exports.log_in_POST = asyncHandler(async (req, res, next) => {

});