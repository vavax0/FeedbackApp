const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Board" },
  seq: { type: Number, default: 1 },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
