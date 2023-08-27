const mongooes = require("mongoose");

const customersSchema = mongooes.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  city: {
    type: String,
    required: [true, "Please add the user email address"],
  },
});

module.exports = mongooes.model("Customer", customersSchema);
