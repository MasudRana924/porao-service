const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const teacherAccountSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  degree: {
    type: String,
  },
  expert: { type: String },
  experience: { type: String },
  fees: { type: String },
  versityName: { type: String },
  image: { type: String },
  bio: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "teacher",
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const TeacherAccount = mongoose.model("TeacherAccount", teacherAccountSchema);
module.exports = TeacherAccount;