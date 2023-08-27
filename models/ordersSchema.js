const mongooes = require("mongoose");

const ordersSchema = mongooes.Schema({
  orderNumber: {
    type: mongooes.Schema.Types.Number,
  },
  itemId: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "Items",
  },
  price: {
    type: mongooes.Schema.Types.Number,
    required: [true, "Please add the price of the order"],
  },
  customerId: {
    type: mongooes.Schema.Types.ObjectId,
    required: [true],
    ref: "Customer",
  },
  deliveryVehicleId: {
    type: mongooes.Schema.Types.ObjectId,
    required: true,
    ref: "Delivery",
  },
  isDelivered: {
    type: mongooes.Schema.Types.Boolean,
    default: false,
  },
});

module.exports = mongooes.model("Orders", ordersSchema);

ordersSchema.pre("save", function (next) {
  var doc = this;
  counter.findByIdAndUpdate(
    { ordersSchema: "entityId" },
    { $inc: { seq: 1 } },
    function (error, counter) {
      if (error) return next(error);
      doc.testvalue = counter.seq;
      next();
    }
  );
});
