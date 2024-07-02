const AttendanceModel = require('../models/Attendance');
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
    const createdAttendance = await AttendanceModel.createAttendance(attendanceData);
    res.success(createdAttendance, 'Attendance created successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.user;
    const attendances = await AttendanceModel.getAttendanceByStudent(studentId);
        const totalAttendance = attendances.length;
    const presentCount = attendances.filter((a) => a.status === 'present').length;
    const absentCount = attendances.filter((a) => a.status === 'absent').length;

    const presentPercentage = (presentCount / totalAttendance) * 100;
    const absentPercentage = (absentCount / totalAttendance) * 100;
    // res.success(attendance, 'Attendance fetched successfully');
        res.success(
      {
        attendances,
        totalAttendance,
        presentPercentage,
        absentPercentage,
      },
      'Attendance fetched successfully'
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getAttendanceByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const attendance = await AttendanceModel.getAttendanceByBatch(batchId);
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