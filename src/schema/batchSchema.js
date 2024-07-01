const mongoose = require('mongoose');
const uuidv4 = require("uuid").v4;
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  description: {
    type: String
  },
  teacherId: {
    type: String,
    required: true,
    ref: "TeacherAccount",
  },
  capacity: {
    type: Number,
  },
  subject: { type: String },
  days: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }],
  createdAt: {
    type: Date,
    default: () => getCurrentDateTimeUTCPlus6(),
  },
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;