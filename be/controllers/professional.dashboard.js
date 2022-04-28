/**
 * API's for Professional Dashboard
 * Get Professional info
 * Upload Videos
 * Upload Meal Plans
 * Get Calendar
 */

const logger = require("../utils/logger");
const lodash = require("lodash");
const { User } = require("../models/user.schema");
const { PlansSchema } = require("../models/plans.schema");
const { FileInfoSchema } = require("../models/file.schema");
const { ProfessionalInfo } = require("../models/professional_info.schema");

/**
 * Get a Professional Info
 * @param {Object} req
 * @param {Object} res
 */
async function readProfessional(req, res) {
  try {
    const professional = await User.findById(req.params.professionalId)
      .select("activated")
      .populate({
        path: "professional_info",
        select:
          "name email address professional_type number description gender",
      });
    res.status(200).send(professional);
  } catch (error) {
    logger.error("Error in getting professional info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

/**
 * Update Professional
 * @param {Object} req
 * @param {Object} res
 */
async function updateProfessional(req, res) {
  try {
    if (lodash.isEmpty(req.body)) {
      return res.status(400).send({
        message: "Body cannot be empty!",
      });
    }

    if (req.body.name || req.body.email) {
      return res.status(400).send({
        message:
          "Body cannot contain name and email and they can't be updated. Contact Customer support!",
      });
    }

    const professional = await User.findById(req.params.professionalId);
    const candidatedata = await ProfessionalInfo.findByIdAndUpdate(
      professional.professional_info,
      req.body,
      { new: true }
    );
    res.status(200).send(candidatedata);
  } catch (error) {
    logger.error("Error in updating Professional data: " + error);
    res.status(500).send({
      message: "Something went wrong." + error,
    });
  }
}

/**
 * Get all professionals Info
 * @param {Object} req
 * @param {Object} res
 */
async function getAllProfessional(req, res) {
  try {
    const allProfessionals = await User.find({
      user_type: "Professional",
    })
      .select("activated")
      .populate({
        path: "professional_info",
        select:
          "name email address professional_type number description gender",
      });
    res.status(200).send(allProfessionals);
  } catch (error) {
    logger.error("Error in getting all profesional data: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

/**
 * Upload File
 * @param {Object} req
 * @param {Object} res
 */
async function uploadFile(req, res) {
  try {
    const response = await new FileInfoSchema({
      file_public_url: req.file_public_url,
      professional_id: req.params.clientId,
      file_type: req.query.type,
    });

    await response.save();
    res.status(200).send({
      response,
    });
    return;
  } catch (error) {
    logger.error("Error in creating a reponse: " + error);
    res.status(500).send({
      message: "Something went wrong while saving the data: " + error,
    });
    return;
  }
}

/**
 * Get all customers enrolled
 * @param {Object} req
 * @param {Object} res
 */
async function getAllCustomerForProfessional(req, res) {
  try {
    const allProfessionals = await User.findById(req.params.professionalId)
      .select("professional_info")
      .populate({
        path: "professional_info",
        select: "professional_info",
        populate: {
          path: "customers_enrolled",
        },
      });
    res.status(200).send(allProfessionals);
  } catch (error) {
    logger.error("Error in getting all profesional data: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

module.exports = {
  readProfessional,
  getAllProfessional,
  uploadFile,
  updateProfessional,
  getAllCustomerForProfessional,
};
