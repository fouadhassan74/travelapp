const router = require("express").Router();
const Pin = require("../models/pin");
// Create
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  const savedPin = await newPin.save();
  res.status(200).json(savedPin);
});
// get all
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
