const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    onroadprice: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual", "Semi-Automatic"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);
module.exports = Car;
