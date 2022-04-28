const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const plansSchema = new Schema(
  {
    active: { type: Boolean, default: false },
    name: { type: String },
    professional_id: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.USER,
    },
    type: {
      type: String,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: CONSTANTS.MODELS.FILES,
      },
    ],
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    requirements: {
      type: String,
    },
    customer_enrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: CONSTANTS.MODELS.USER,
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  PlansSchema: mongoose.model("PlansSchema", plansSchema),
};
