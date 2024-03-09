const mongoose = require("mongoose");
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const uuidv4 = require("uuid").v4;
const slotSchema = new mongoose.Schema({
    slotId: {
      type: String,
      default: uuidv4,
      required: true,
    },
    teacherId: {
        type: String,
        required: true,
        ref:'TeacherAccount'
      },
    day: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    createdAt: {
      type: Date,
      default: () => getCurrentDateTimeUTCPlus6(),
    },
    modifiedAt: {
      type: Date,
      default: () => getCurrentDateTimeUTCPlus6(),
    },
  });
  
  const Slots = mongoose.model("Slots", slotSchema);
  module.exports = Slots;
  