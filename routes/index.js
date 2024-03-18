var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");

const user_controller = require("../controllers/userController.js");
const post_controller = require("../controllers/postController.js");

const Post = require("../models/Post");

router.use(
  "/",
  asyncHandler(async (req, res, next) => {
    //retrieve the user from session, user authenticated
    if (req.user) {
      res.locals.user = req.user;
      const posts = await Post.find();
      res.locals.posts = posts;
    }
    next();
  })
);

router.use("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    //checks whether user
    //is authenticated by the passport.authenticate() method
    console.log("user is logged in")
    next();
  }
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.jade");
});

router.get("/sign-up", user_controller.sign_up_GET);

router.get("/log-in", user_controller.log_in_GET);

router.post("/log-out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/sign-up", user_controller.sign_up_POST);

router.post("/log-in", user_controller.log_in_POST);

router.get("/post-form", post_controller.post_form_GET);

router.post("/post-form", post_controller.post_form_POST);

module.exports = router;
