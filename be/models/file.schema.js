const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const fileInfoSchema = new Schema(
  {
    professional_id: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.USER,
      default: null,
    },
    file_public_url: {
      type: String,
      require: true,
    },
    acitvated_by_admin: {
      type: Boolean,
      default: false,
    },
    file_type: {
      type: String,
      enum: [CONSTANTS.FILE_TYPE.DOCUMENT, CONSTANTS.FILE_TYPE.VIDEO],
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  FileInfoSchema: mongoose.model("FileInfoSchema", fileInfoSchema),
};
