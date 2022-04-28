const { Storage } = require("@google-cloud/storage");
const CONFIG = require("./../config/index");
const { GCLOUD_PROJECT_ID, KEYFILE_PATH } = require("./../config/index");

/**
 * Creating GCS storage class for accessing bucket
 * Uncomment projectId and keyFilename when not deployed on GAE
 */

const storage =
  CONFIG.NODE_ENV === "local"
    ? new Storage({
        projectId: GCLOUD_PROJECT_ID,
        keyFilename: KEYFILE_PATH,
      })
    : new Storage();

module.exports.storage = storage;
