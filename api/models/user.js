const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
