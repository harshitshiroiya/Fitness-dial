const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CONFIG = require("../config/index");

const {
  sendEmailForActivatingCustomer,
  sendAccountActivationMail,
} = require("../services/sendGrid");

/**
 * Sign up user - send email for user acivation
 * @param {Object} req
 * @param {Object} res
 */
async function signUp(req, res) {
  const { first_name, last_name, email, phone_number, user_type } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists != null || userExists) {
    res.status(401).send({
      message: "Bad request params - email already exists. Try logging in!",
    });
    return;
  }

  try {
    const user = await new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      user_type: user_type,
    });

    await user.save();

    // creating token using email & createdAt
    const userId = user._id;
    const secret = user.email + "-" + user.createdAt;
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600, // 1 hour
    });

    //TODO: Add cases for customer, professional & admin

    // create password reset url from token
    const url = `${CONFIG.CLIENT_SIDE_URL}?id=${user._id}&token=${token}`;

    // send email
    await sendEmailForActivatingCustomer(user, url);

    res.status(200).send({
      message: "Sent mail for Authentication!",
    });
  } catch (error) {
    logger.error("Error in sign up: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
    return;
  }
}

/**
 * Sign up user - Verify create password link, add password to db and activate user
 * @param {Object} req
 * @param {Object} res
 */
async function createPassword(req, res) {
  const { userId, token } = req.params;
  const { new_pass, confirm_new_pass } = req.body;
  try {
    const user = await User.findById(userId);
    if (user === null) {
      res.status(401).send({ message: "You are not Authorized!" });
      return;
    }
    // check if token is correct
    const secret = user.email + "-" + user.createdAt;
    jwt.verify(token, secret, async (err, payload) => {
      if (err || payload.userId != user._id) {
        logger.info(err);
        res.status(401).send({ message: "You are not Authorized!!" });
        return;
      }
      await checkPassConstraints(new_pass, confirm_new_pass);
      const passwordHash = bcrypt.hashSync(new_pass, 10);
      await User.updateOne(
        { _id: userId },
        { password: passwordHash },
        { activated: true }
      );
      // await sendAccountActivationMail(user);
      res.status(200).send({ message: "Password successfully changed!" });
    });
  } catch (error) {
    logger.error("Error: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
  }
}

/**
 * Login & create cookie
 * @param {Object} req
 * @param {Object} res
 */
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send({
      message:
        "Bad request params - you need to provide an email and a password",
    });
    return;
  }
  try {
    const validated = await authenticate(username, password);
    req.session.user = validated;
    res.status(200).send({
      message: "Successfully logged in!",
    });
  } catch (error) {
    logger.error("Error in authenticating: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
    return;
  }
}

/**
 * Logout & destroy cookie
 * @param {Object} req
 * @param {Object} res
 */
function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      logger.error(err);
      res.status(500).send({ message: "Something went wrong!" }); // can be redirected to login in prod
    } else {
      res.status(200).send({ message: "Logged out Successfully" }); // can be redirected to login in prod
    }
  });
}

/**
 * Check if email & pass exists
 */
async function authenticate(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      logger.error("Email is not valid!");
      return Promise.reject("Email is not valid!");
    }
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const user_info = {
        first_name: user.first_name,
        email: user.email,
        userId: user._id,
      };
      return user_info;
    } else {
      logger.error("Password is not valid!");
      return Promise.reject("Password is not valid!");
    }
  } catch (err) {
    logger.error("Something went wrong: " + err);
    return Promise.reject("Something went wrong");
  }
}

/**
 * Checks password equality, contraints & updates db with new pass
 * Regex check: Atleast 1 lowercase, 1 uppercase, 1 number. length 6 - 20
 */
async function checkPassConstraints(new_pass, confirm_new_pass) {
  try {
    if (new_pass != confirm_new_pass) {
      logger.error("Entered password do not match!");
      return Promise.reject("Entered password do not match!");
    }
    if (!new_pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/)) {
      logger.error("Entered password do not meet constraints!");
      return Promise.reject("Entered password do not meet constraints!");
    }
  } catch (err) {
    logger.error("Something went wrong: " + err);
    return Promise.reject("Something went wrong");
  }
}

module.exports = {
  signUp,
  createPassword,
  login,
  logout,
};
