const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");
const connectDB = require("./dbConnection");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/items", require("./routes/ItemRoutes"));
app.use("/api/delivery-vehicle", require("./routes/DeliveryVehicle"));
app.use("/api/customer", require("./routes/customerRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.get(
  "/get-token",
  asyncHandler(async (req, res) => {
    try {
      const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      });
      res.status(200).send(`Bearer ${accessToken}`);
    } catch (err) {
      res.status(404);
      throw new Error(err);
    }
  })
);
app.use(errorHandler);

app.listen(port, () => console.log("Server running on", port));
