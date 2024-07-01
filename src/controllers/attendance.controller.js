const AttendanceModal = require('../models/Attendance');
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const createAttendance = async (req, res) => {
  try {
    const { studentId, batchId, date, status } = req.body;
    const attendanceData = {
       studentId,
      batchId,
      date,
      status
    };
    const createdAttendance = await AttendanceModal.createAttendance(attendanceData);
    res.success(createdAttendance, 'Attendance created successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await AttendanceModal.getAttendanceByStudent(studentId);
    res.success(attendance, 'Attendance fetched successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getAttendanceByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const attendance = await AttendanceModal.getAttendanceByBatch(batchId);
    res.success(attendance, 'Attendance fetched successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByBatch
};