const mongooes = require("mongoose");

const deliverySchema = mongooes.Schema({
  registrationNumber: {
    type: String,
    unique: [true, "Another Vehicle is alredy registed with the number"],
  },
  vehicleType: {
    type: String,
    enum: ["bike", "truck"],
    required: [true, "Please enter the vehicle type"],
  },
  city: {
    type: String,
    required: [true],
    ref: "Customer",
  },
  activeOrdersCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2,
  },
});

module.exports = mongooes.model("DeliveryVehicle", deliverySchema);
