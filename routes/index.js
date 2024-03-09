var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController.js");
const post_controller = require("../controllers/postController.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/sign-up", user_controller.sign_up_GET);

router.get("/log-in", user_controller.log_in_GET);

router.post("/sign-up", user_controller.sign_up_POST);

router.post("/log-in", user_controller.log_in_POST);

module.exports = router;
