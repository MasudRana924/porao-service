const mongoose = require('mongoose');
const uuidv4 = require("uuid").v4;

const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  teacher: {
    type: String,
    ref: 'TeacherAccount'
  },
  students: [{ type: String, ref: 'StudentAccount' }],
  subjects: [{ type: String }],
  days: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;