/**
 * API's for Master Admin - TESTING & DATA UPLOAD
 */

const CONSTANTS = require("../config/constants");
const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const { ProfessionalInfo } = require("../models/professional_info.schema");
const { CustomerInfo } = require("../models/customer_info.schema");
const { PlansSchema } = require("../models/plans.schema");
const bcrypt = require("bcrypt");

/**
 * Create a professional
 * @param {Object} req
 * @param {Object} res
 */
async function createProfessional(req, res) {
  const {
    first_name,
    last_name,
    email,
    country,
    address,
    professional_type,
    password,
    gender,
    number,
    description,
    age,
  } = req.body;
  const name = first_name + " " + last_name;
  const professional_info = await new ProfessionalInfo({
    name: name,
    email: email,
    number: number,
    description: description,
    active: true,
    country: country,
    address: address,
    professional_type: professional_type,
    gender: gender,
    onboarding_date: Date.now(),
    age: age,
  });
  await professional_info.save();

  //assigning a random password to user
  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    user_type: CONSTANTS.USER_TYPE.PROFESSIONAL,
    password: passwordHash,
    professional_info: professional_info._id,
    activated: true,
  });

  await user.save();
  res.status(200).send(user);
}

/**
 * Create a customer
 * @param {Object} req
 * @param {Object} res
 */
async function createCustomer(req, res) {
  const {
    first_name,
    last_name,
    email,
    country,
    address,
    password,
    gender,
    number,
    description,
    age,
    weight,
    height,
    bmi,
    primary_goal,
    plans_enrolled,
    professionals_enrolled,
  } = req.body;

  const name = first_name + " " + last_name;

  const customer_info = await new CustomerInfo({
    name: name,
    email: email,
    number: number,
    description: description,
    active: true,
    country: country,
    address: address,
    gender: gender,
    onboarding_date: Date.now(),
    plans_enrolled: plans_enrolled,
    age: age,
    weight: weight,
    height: height,
    bmi: bmi,
    primary_goal: primary_goal,
    professionals_enrolled: professionals_enrolled,
  });
  await customer_info.save();

  //assigning a random password to user
  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    user_type: CONSTANTS.USER_TYPE.CUSTOMER,
    password: passwordHash,
    customer_info: customer_info._id,
    activated: true,
  });

  await user.save();
  res.status(200).send(user);
  return;
}

/**
 * Create a plan
 * @param {Object} req
 * @param {Object} res
 */
async function createPlan(req, res) {
  try {
    const {
      type,
      files,
      description,
      duration,
      requirements,
      customer_enrolled,
    } = req.body;

    const plan = await new PlansSchema({
      professional_id: req.params.professionalId,
      type: type,
      files: files,
      description: description,
      duration: duration,
      requirements: requirements,
      customer_enrolled: customer_enrolled,
    });

    await plan.save();

    res.status(200).send({
      plan,
    });

    return;
  } catch (error) {
    logger.error("Error in creating the customer: " + error);
    res.status(500).send({
      message: "Something went wrong while saving the data: " + error,
    });
    return;
  }
}

/**
 * Get all plans
 * @param {Object} req
 * @param {Object} res
 */
async function getAllPlans(req, res) {
  try {
    const plans = await PlansSchema.find(req.query);
    res.status(200).send({
      plans,
    });
    return;
  } catch (error) {
    logger.error("Error in getting all the plans: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
    return;
  }
}

/**
 * Get all Users
 * @param {Object} req
 * @param {Object} res
 */
async function getAllUsers(req, res) {
  try {
    const users = await User.find(req.query);
    res.status(200).send({
      users,
    });
    return;
  } catch (error) {
    logger.error("Error in getting all the Users: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
    return;
  }
}

module.exports = {
  createProfessional,
  createCustomer,
  createPlan,
  getAllPlans,
  getAllUsers,
};
