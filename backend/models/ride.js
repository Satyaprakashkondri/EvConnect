const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const RideSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorName: String,
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  carDetails: { type: String, required: true },
});

module.exports = mongoose.model("Ride", RideSchema);
