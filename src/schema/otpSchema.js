const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");

const otpSchema = new mongoose.Schema({
  otpId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
