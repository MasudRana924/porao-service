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
  students: [{ type: String, ref: 'StudentAccount' }],
  subject: { type: String },
  days: [{ type: String,enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }]
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;