const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

exports.post_form_GET = function (req, res, next) {
  res.render("post-form");
};

exports.post_form_POST = asyncHandler(async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    postedBy: req.user,
    postedTime: new Date(),
  });
  post.save();
  res.redirect("/");
});
