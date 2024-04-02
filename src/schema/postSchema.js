const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");

const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        default: uuidv4,
        required: true,
    },
    teacherId: {
        type: String,
        required: true,
        ref: "TeacherAccount",
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => getCurrentDateTimeUTCPlus6(),
    },
});

const POST = mongoose.model("POST", postSchema);
module.exports = POST;
