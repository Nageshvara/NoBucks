const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true }
});

module.exports = mongoose.model("UserDetails", userDetailsSchema);
