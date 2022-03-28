const sgMail = require("@sendgrid/mail");
const CONFIG = require("../config/index");
const logger = require("./../utils/logger");

const { SIGNUP_CUSTOMER } = require("./sgTemplate");

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

// const sendAccountActivationMail

module.exports = { sendEmailForActivatingCustomer };
