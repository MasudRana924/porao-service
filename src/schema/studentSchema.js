const mongoose = require('mongoose');
const uuidv4 = require("uuid").v4;

const studentAccountSchema = new mongoose.Schema({
  studentId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  batch: {
    type: String
  },
  standard: {
    type: String
  },
  institution: {
    type: String
  },
    image: {
    type: String,
  },
    role: {
    type: String,
    required: true,
    default: "student",
  },
  enrolledSubjects: [{ type: String }]
});

const StudentAccount = mongoose.model("StudentAccount", studentAccountSchema);
module.exports = StudentAccount;


// const mongoose = require("mongoose");
// const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
// const uuidv4 = require("uuid").v4;
// //Create a schema for the Student
// const studentAccountSchema = new mongoose.Schema({
//   studentId: {
//     type: String,
//     default: uuidv4,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     // required: true,
//   },
//   lastName: {
//     type: String,
//     // required: true,
//   },
//   role: {
//     type: String,
//     required: true,
//     default: "student",
//   },
//   class: {
//     type: String,
//   },
//   email: {
//     type: String,
//     required: true,
//     // unique: true,
//   },
//   password: {
//     type: String,
//     // required: true,
//   },
//   phone: {
//     type: String,
//     // required: true,
//   },
//   guardianContact: { type: String },
//   address: {
//     type: String,
//   },
//   image: {
//     type: String,
//   },
//   coverImage: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: () => getCurrentDateTimeUTCPlus6(),
//   },
//   modifiedAt: {
//     type: Date,
//     default: () => getCurrentDateTimeUTCPlus6(),
//   },
// });

// const StudentAccount = mongoose.model("StudentAccount", studentAccountSchema);
// module.exports = StudentAccount;
