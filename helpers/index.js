const sendEmail = require("./sendEmail");
const { generateTokens, saveToken } = require("./token");

module.exports = { sendEmail, generateTokens, saveToken };
