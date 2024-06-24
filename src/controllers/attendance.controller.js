const { attendanceService } = require('../models/Attendance');

const createAttendance = async (req, res) => {
  try {
    const { studentId, batchId, date, status } = req.body;
    const attendanceData = {
      student: studentId,
      batch: batchId,
      date,
      status
    };
    const createdAttendance = await attendanceService.createAttendance(attendanceData);
    res.success(createdAttendance, 'Attendance created successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await attendanceService.getAttendanceByStudent(studentId);
    res.success(attendance, 'Attendance fetched successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getAttendanceByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const attendance = await attendanceService.getAttendanceByBatch(batchId);
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
















// const AttendanceModel = require("../models/Attendance");
// const { errorResponseHandler } = require("../helper/errorResponseHandler");
// const { statusCodes } = require("../helper/statusCodes.js");
// const createAttendanceRecord = async (req, res) => {
//   try {
//     const { slotId, studentId,attendanceDate,status } = req.body;
//     const { teacherId } = req.user;
//     const attendanceRecord = await AttendanceModel.createAttendanceRecord({
//       teacherId,
//       slotId,
//       studentId,
//       attendanceDate,
//       status,
//     });
//     res.created(attendanceRecord, "Attendance updated successfully");
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };

// const findStudentAttenceRecordBySlotId = async (req, res) => {
//   try {
//     const { slotId } = req.body;
//     const { studentId } = req.user;
//     const student = await AttendanceModel.findStudentAccountById(studentId);
//     if (student) {
//       const findSlotId = await AttendanceModel.findStudentAttendanceByslotId(
//         slotId
//       );
//       if (!findSlotId) {
//         throw Object.assign(new Error(), {
//           status: statusCodes.NOT_FOUND,
//           error: {
//             code: 40407,
//           },
//         });
//       }
//       const studentRecord = await AttendanceModel.findStudentRecordByslotId(
//         slotId
//       );
//       res.success(studentRecord, "Attendance Record get successfully.");
//     }
//     if (!student) {
//       throw Object.assign(new Error(), {
//         status: statusCodes.UNAUTHORIZED,
//         error: {
//           code: 40406,
//         },
//       });
//     }
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };
// module.exports = {
//   createAttendanceRecord,
//   findStudentAttenceRecordBySlotId,
// };
