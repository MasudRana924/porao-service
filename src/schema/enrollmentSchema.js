const mongoose = require('mongoose');
const uuidv4 = require("uuid").v4;

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  student: {
    type: String,
    ref: 'StudentAccount',
    required: true
  },
  teacher: {
    type: String,
    ref: 'TeacherAccount',
    required: true
  },
  batch: {
    type: String,
    ref: 'Batch',
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'ejected']
  }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;