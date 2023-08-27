const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const Order = require("./../models/ordersSchema");
const DeliveryVehicle = require("./../models/deliveryVehicle");
const Customer = require("./../models/customersSchema");

router.use(validateToken);

router.post(
  "/place-order",
  asyncHandler(async (req, res) => {
    const { itemId, price, customerId } = req.body;
    if (!price || !customerId || !itemId) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    try {
      const foundCustomer = await Customer.findById(customerId);
      if (foundCustomer) {
        const deliveryVehicles = await DeliveryVehicle.find({
          vehicleType: "truck",
          city: foundCustomer.city,
          activeOrdersCount: { $lt: 2 },
        });

        if (deliveryVehicles?.length) {
          const item = await Order.create({
            itemId,
            price,
            customerId,
            deliveryVehicleId: deliveryVehicles[0]._id,
          });

          await DeliveryVehicle.findOneAndUpdate(
            {
              _id: deliveryVehicles[0]._id,
            },
            {
              activeOrdersCount: deliveryVehicles[0].activeOrdersCount + 1,
            }
          );

          res.status(200).send("Order Placed Successfully");
        } else {
          res.status(404);
          throw new Error("No delivery vehicles found");
        }

        res.status(200).send("Order Placed Successfully");
      } else {
        res.status(404);
        throw new Error("Customer Not Found");
      }
    } catch (err) {
      res.status(404);
      throw new Error(err);
    }
  })
);

router.post(
  "/mark-order-delivered",
  asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    if (!orderId) {
      res.status(400);
      throw new Error("Please pass Order ID");
    }

    try {
      const order = await Order.findById(orderId);

      if (!order) {
        res.status(404);
        throw new Error("Order not found");
      } else {
        const vehicleUpdate = await DeliveryVehicle.findOneAndUpdate(
          {
            _id: order.deliveryVehicleId,
          },
          { $inc: { activeOrdersCount: -1 } }
        );
        const updateOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { isDelivered: true }
        );
      }

      res.status(200).send({ message: "Order Marked Delivered", status: true });
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  })
);

module.exports = router;
