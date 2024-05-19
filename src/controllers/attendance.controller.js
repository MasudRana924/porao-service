const AttendanceModel = require("../models/Attendance");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const { statusCodes } = require("../helper/statusCodes.js");
const createAttendanceRecord = async (req, res) => {
  try {
    const { slotId, studentId,attendanceDate,status } = req.body;
    const { teacherId } = req.user;
    const attendanceRecord = await AttendanceModel.createAttendanceRecord({
      teacherId,
      slotId,
      studentId,
      attendanceDate,
      status,
    });
    res.created(attendanceRecord, "Attendance updated successfully");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const findStudentAttenceRecordBySlotId = async (req, res) => {
  try {
    const { slotId } = req.body;
    const { studentId } = req.user;
    const student = await AttendanceModel.findStudentAccountById(studentId);
    if (student) {
      const findSlotId = await AttendanceModel.findStudentAttendanceByslotId(
        slotId
      );
      if (!findSlotId) {
        throw Object.assign(new Error(), {
          status: statusCodes.NOT_FOUND,
          error: {
            code: 40407,
          },
        });
      }
      const studentRecord = await AttendanceModel.findStudentRecordByslotId(
        slotId
      );
      res.success(studentRecord, "Attendance Record get successfully.");
    }
    if (!student) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40406,
        },
      });
    }
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  createAttendanceRecord,
  findStudentAttenceRecordBySlotId,
};
