const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pin");
const userRoute = require("./routes/user");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/travelapp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(`The error is ${e}`);
  });
// routes
app.use("/api/pin", pinRoute);
app.use("/api/user", userRoute);

app.listen(9900, () => console.log("Bakend server is running"));
