const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken");
// register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, "fouad").toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});
// login
router.post("/login", async (req, res) => {
  const foundedUser = await User.findOne({
    username: req.body.username,
  });
  !foundedUser && res.status(200).json("Wrong  userName");
  const hashedPassword = CryptoJS.AES.decrypt(foundedUser.password, "fouad");
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  const inputPassword = req.body.password;
  inputPassword !== originalPassword && res.status(401).json("Wrong Passwoed");
  const accessToken = Jwt.sign(
    {
      id: foundedUser._id,
    },
    "fouad",
    { expiresIn: "3d" }
  );
  const { password, ...others } = foundedUser._doc;
  res.status(200).json({ ...others, accessToken });
});
module.exports = router;
