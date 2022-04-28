const logger = require("../utils/logger");
const { format } = require("util");
const { storage } = require("./../services/gcs");
const CONSTANT = require("./../config/index");

const bucket = storage.bucket(CONSTANT.BUCKET_NAME); // Bucket name

/**
 * Uses multer's req.files to upload data to GCS
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const fileUploader = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send({
      message: "No file uploaded.",
    });
    return;
  }

  // Storge Object format: bucket/professinal_id/file
  const objectId = format(`${req.params.clientId}/${req.file.originalname}`); // Should be moved to a central place like constants

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(objectId);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    logger.log("error", "Issue when uploading to Google Storage: " + err);
    res.status(500).send({
      message: "Couldn't upload to GCS: " + err,
    });
    return;
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`gs://${bucket.name}/${blob.name}`);
    req.file_public_url = publicUrl;
    next();
  });

  blobStream.end(req.file.buffer);
};

module.exports = {
  fileUploader,
};
