/**
 * API's for Admin Dashboard
 * Get a list of all the videos not approved
 * Approve Videos
 */
const logger = require("../utils/logger");
const { FileInfoSchema } = require("../models/file.schema");

/**
 * Get All Files
 * @param {Object} req
 * @param {Object} res
 */
async function getFiles(req, res) {
  try {
    const files = await FileInfoSchema.find(req.query).populate({
      path: "professional_id",
      select: "name email address professional_type number description",
    });
    res.status(200).send(files);
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

/**
 * Approve a file
 * @param {Object} req
 * @param {Object} res
 */
async function approveFile(req, res) {
  try {
    const file = await FileInfoSchema.findById(req.params.fileId);
    file.acitvated_by_admin = true;
    await file.save();
    res.status(200).send({ message: "File Approved! Status changed!" });
  } catch (error) {
    logger.error("Error in approving file: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

module.exports = {
  getFiles,
  approveFile,
};
