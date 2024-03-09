const mongoose = require("mongoose");
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const uuidv4 = require("uuid").v4;
//Create a schema for the teacher
const teacherAccountSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  degree: {
    type: String,
  },
  gender: {
    type: String,
  },
  expert: {
    type: String,
  },
  experience: {
    type: String,
  },
  versityName: {
    type: String,
  },
  fees: { type: Number },
  role: {
    type: String,
    required: true,
    default: "teacher",
  },
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
  modifiedAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const TeacherAccount = mongoose.model("TeacherAccount", teacherAccountSchema);
module.exports = TeacherAccount;
