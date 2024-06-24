const mongoose = require("mongoose");
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const uuidv4 = require("uuid").v4;

const bookedTeacherSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  teacherId: {
    type: String,
  },
  teacherName: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  studentId: {
    type: String,
  },
  studentName: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
  slotId: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    // required: true,
  },
  startTime: { type: String },
  endTime: { type: String },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const BookedTeacher = mongoose.model("BookedTeacher", bookedTeacherSchema);
module.exports = BookedTeacher;
