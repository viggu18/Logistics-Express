const mongooes = require("mongoose");

const itemsSchema = mongooes.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  price: {
    type: Number,
    required: [true, "Please add the user email address"],
  },
});

module.exports = mongooes.model("Items", itemsSchema);
