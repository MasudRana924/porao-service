const mongoose = require("mongoose");
const { getCurrentDateTimeUTCPlus6 } = require("../helper/dateTimeHelpers");
const uuidv4 = require("uuid").v4;
const notificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        default: uuidv4,
        required: true,
    },
    message: {
        type: String,
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
const Notifications = mongoose.model("Notifications", notificationSchema);
module.exports = Notifications;
