const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config();

const Post = require("./models/Post");
const User = require("./models/User");


const mongoDBURI = process.env.mongodb_String;
async function main() {
  console.log("connecting to mongoose");
  await mongoose.connect(mongoDBURI);
  console.log("connected");
  await createAdmin();
  mongoose.connection.close();
  console.log("closed");
}

main().catch((err) => console.log(err));

const admin = new User({username : "admin", email : "admin@gmail.com", password: "secretPass", membershipStatus: "Private"});
async function createAdmin(){
    await admin.save();
}