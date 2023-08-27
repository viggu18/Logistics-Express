const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const DeliveryVehicle = require("./../models/deliveryVehicle");

router.use(validateToken);

router.post(
  "/create-vehicle",
  asyncHandler(async (req, res) => {
    const { vehicleType, city, registrationNumber } = req.body;

    if (!city || !vehicleType || !registrationNumber) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    if (!["bike", "truck"].includes(vehicleType)) {
      res.status(400);
      throw new Error("Vehicle type is not allowed");
    }

    try {
      const item = await DeliveryVehicle.create({
        registrationNumber,
        city,
        vehicleType,
      });
      res.status(200).send(item);
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  })
);

router.get(
  "/get-vehicle/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Please pass ID to the API");
    }

    const item = await DeliveryVehicle.findById(id);

    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    res.status(200).send(item);
  })
);

router.post(
  "/update-vehicle",
  asyncHandler(async (req, res) => {
    const { vehicleType, city, registrationNumber } = req.body;

    if (!city || !vehicleType || !registrationNumber) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    if (!["bike", "truck"].includes(vehicleType)) {
      res.status(400);
      throw new Error("Vehicle type is not allowed");
    }

    try {
      const item = await DeliveryVehicle.findOneAndUpdate({
        registrationNumber,
        city,
        vehicleType,
      });
      res
        .status(200)
        .send({ status: true, message: "Item Updated Successfully" });
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  })
);

module.exports = router;
