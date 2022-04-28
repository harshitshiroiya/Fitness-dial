const mongoose = require("mongoose");
const CONSTANTS = require("../config/constants");
const Schema = mongoose.Schema;

const professionalInfoSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    onboarding_date: {
      type: Date,
    },
    number: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
    professional_type: {
      type: String,
      enum: [
        CONSTANTS.PROFESSIONAL_TYPE.YOGA,
        CONSTANTS.PROFESSIONAL_TYPE.MENTAL_HEALTH,
        CONSTANTS.PROFESSIONAL_TYPE.WEIGHT_TRAINING,
        CONSTANTS.PROFESSIONAL_TYPE.ZUMBA,
        CONSTANTS.PROFESSIONAL_TYPE.DIETICIAN,
      ],
      require: true,
    },
    gender: {
      type: String,
      enum: [
        CONSTANTS.GENDER.FEMALE,
        CONSTANTS.GENDER.MALE,
        CONSTANTS.GENDER.OTHERS,
      ],
    },
    age: {
      type: Number,
    },
    customers_enrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: CONSTANTS.MODELS.USER,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  ProfessionalInfo: mongoose.model("ProfessionalInfo", professionalInfoSchema),
};
