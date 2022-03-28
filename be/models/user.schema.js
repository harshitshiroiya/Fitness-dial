const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    phone_number: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", userSchema),
};
