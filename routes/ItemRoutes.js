const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const ItemsModel = require("./../models/itemsSchema");

router.use(validateToken);

router.post(
  "/create-item",
  asyncHandler(async (req, res) => {
    const { name, price } = req.body;
    if (!price || !name) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const item = await ItemsModel.create({
      name,
      price,
    });

    res.status(200).send(item);
  })
);

router.get(
  "/get-item/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Please pass ID to the API");
    }

    const item = await ItemsModel.findById(id);

    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    res.status(200).send(item);
  })
);

router.post(
  "/update-item",
  asyncHandler(async (req, res) => {
    const { id, name, price } = req.body;
    if (!id) {
      res.status(400);
      throw new Error("Please pass ID to the API");
    }
    const item = await ItemsModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        price,
      }
    );
    res.status(200).send({ message: "Item Updated Successfully" });
  })
);

module.exports = router;
