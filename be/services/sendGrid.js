//TODO: Some Redundant API's. Can be reduced

const sgMail = require("@sendgrid/mail");
const CONFIG = require("../config/index");
const logger = require("./../utils/logger");

const {
  SIGNUP_CUSTOMER,
  SIGNUP_PROFESSIONAL,
  ACTIVATION_MAIL,
  PASSWORD_CHANGE_CONFIRMATION,
} = require("./sgTemplate");

/**
 * Send user email for sign up and email verification
 */
const sendEmailForActivatingCustomer = async (user, url) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: SIGNUP_CUSTOMER,

    dynamic_template_data: {
      name: user.first_name,
      url: url,
    },
    hideWarnings: true, // now the warning won't be logged
  };
  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
    })
    .catch((error) => {
      logger.error(error);
      return Promise.reject("Email not sent!");
    });
};

/**
 * Send user email for sign up and email verification
 */
const sendEmailForActivatingProfessional = async (user, url) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: SIGNUP_PROFESSIONAL,

    dynamic_template_data: {
      name: user.first_name,
      url: url,
    },
    hideWarnings: true, // now the warning won't be logged
  };
  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
    })
    .catch((error) => {
      logger.error(error);
      return Promise.reject("Email not sent!");
    });
};

const sendAccountActivationMail = async (user, url) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: ACTIVATION_MAIL,

    dynamic_template_data: {
      name: user.first_name,
      url: "https://fitnessdial.com/login",
    },
    hideWarnings: true, // now the warning won't be logged
  };
  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
    })
    .catch((error) => {
      logger.error(error);
      return Promise.reject("Email not sent!");
    });
};

const passwordChangeSuccess = async (user) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: PASSWORD_CHANGE_CONFIRMATION,

    dynamic_template_data: {
      name: user.first_name,
    },
    hideWarnings: true, // now the warning won't be logged
  };
  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
    })
    .catch((error) => {
      logger.error(error);
      return Promise.reject("Email not sent!");
    });
};

module.exports = {
  sendEmailForActivatingCustomer,
  sendEmailForActivatingProfessional,
  sendAccountActivationMail,
  passwordChangeSuccess,
};
