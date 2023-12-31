const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    establishment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establishment",
      },
    ],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    organizations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    ],
    country: { type: String, required: true },
    province: { type: String, required: true },
    community: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const City = mongoose.model("City", CitySchema);

module.exports = City;
