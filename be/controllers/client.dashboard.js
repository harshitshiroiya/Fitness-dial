/**
 * API's for Professional Dashboard
 * Get Client info
 * Get Demo Videos
 * Get Calendar
 */

const lodash = require("lodash");
const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const { CustomerInfo } = require("../models/customer_info.schema");
const { ProfessionalInfo } = require("../models/professional_info.schema");

/**
 * Get Client Info
 * @param {Object} req
 * @param {Object} res
 */
async function readClient(req, res) {
  try {
    const client = await User.findById(req.params.clientId)
      .select("activated")
      .populate({
        path: "customer_info",
        select:
          "name email address number age description gender weight height country state professionals_enrolled",
      });

    res.status(200).send(client);
    return;
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

/**
 * Update candiate
 * @param {Object} req
 * @param {Object} res
 */
async function updateClient(req, res) {
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

    // console.log(req.body.professionals_enrolled[0]);

    if (req.body.professionals_enrolled) {
      const professional = await User.findById(
        req.body.professionals_enrolled[0]
      );
      const professional_data = await ProfessionalInfo.findById(
        professional.professional_info
      );

      professional_data.customers_enrolled.push(req.params.clientId);
      await professional_data.save();
    }

    const client = await User.findById(req.params.clientId);
    const candidatedata = await CustomerInfo.findByIdAndUpdate(
      client.customer_info,
      req.body,
      { new: true }
    );
    res.status(200).send(candidatedata);
  } catch (error) {
    logger.error("Error in updating Customer data: " + error);
    res.status(500).send({
      message: "Something went wrong." + error,
    });
  }
}

/**
 * Get All the plans and videos susbcribed by the client
 * @param {Object} req
 * @param {Object} res
 */
async function getPlans(req, res) {
  try {
    const plans = await User.findById(req.params.clientId)
      .select("activated customer_info")
      .populate({
        path: "customer_info",
        populate: {
          path: "plans_enrolled",
          populate: {
            path: "files",
          },
        },
      });

    res.status(200).send(plans);
    return;
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

module.exports = {
  readClient,
  getPlans,
  updateClient,
};
