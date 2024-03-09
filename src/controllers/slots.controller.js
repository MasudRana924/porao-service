const SlotsModel = require("../models/Slots.js");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const createSLots = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;
        const { teacherId } = req.user;
        const newSlot = await SlotsModel.createSlots({
            teacherId,
            day, startTime, endTime
        });
        res.created(newSlot, "Slot create successfully");
    } catch (err) {
        errorResponseHandler(err, req, res);
    }
};
module.exports = {
    createSLots
}