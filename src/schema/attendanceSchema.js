const mongoose = require("mongoose");
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const uuidv4 = require("uuid").v4;

const attendanceSchema = new mongoose.Schema({
  attendanceId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
    ref:'TeacherAccount'
  },
  slotId: {
    type: String,
    // required: true,
    ref:'Slots'
  },
  studentId: {
    type: String,
    required: true,
    ref:'StudentAccount'
  },
  status: {
    type: String,
    required: true,
  },
  attendanceDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
