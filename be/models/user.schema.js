const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    user_type: {
      type: String,
      enum: [
        CONSTANTS.USER_TYPE.ADMIN,
        CONSTANTS.USER_TYPE.CUSTOMER,
        CONSTANTS.USER_TYPE.PROFESSIONAL,
      ],
      require: true,
    },
    customer_info: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.CUSTOMER_INFO,
      default: null,
    },
    professional_info: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.PROFESSIONAL_INFO,
      default: null,
    },
    admin_info: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.ADMIN_INFO,
      default: null,
    },
    activated: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", userSchema),
};
