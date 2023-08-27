const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const customers = require("./../models//customersSchema");

router.use(validateToken);

router.post(
  "/create-customer",
  asyncHandler(async (req, res) => {
    const { name, city } = req.body;
    if (!city || !name) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const item = await customers.create({
      name,
      city,
    });

    res.status(200).send(item);
  })
);

router.get(
  "/get-customer/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Please pass ID to the API");
    }

    const item = await customers.findById(id);

    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    res.status(200).send(item);
  })
);

router.post(
  "/update-customer",
  asyncHandler(async (req, res) => {
    const { id, name, city } = req.body;
    if (!id) {
      res.status(400);
      throw new Error("Please pass ID to the API");
    }
    const item = await customers.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        city,
      }
    );
    res.status(200).send({ message: "Item Updated Successfully" });
  })
);

router.get(
  "/get-token",
  asyncHandler(async (req, res) => {
    const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    res.status(200).send({ message: "Item Updated Successfully" });
  })
);
module.exports = router;
