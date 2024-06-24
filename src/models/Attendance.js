const AttendanceModel = require('../models/Attendance');

const createAttendance = async (data) => {
  const newAttendance = new AttendanceModel(data);
  const createdAttendance = await newAttendance.save();
  return createdAttendance;
};

const getAttendanceByStudent = async (studentId) => {
  const attendance = await AttendanceModel.find({ student: studentId });
  return attendance;
};

const getAttendanceByBatch = async (batchId) => {
  const attendance = await AttendanceModel.find({ batch: batchId });
  return attendance;
};

module.exports = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByBatch
};









// const AttendanceRecord = require("../schema/attendanceSchema");
// const createAttendanceRecord = async (data) => {
//   const newAttendanceRecord = new AttendanceRecord(data);
//   const createdAttendanceRecord = await newAttendanceRecord.save();
//   return createdAttendanceRecord;
// };

// const findStudentAccountById = async (studentId) => {
//     const student = await AttendanceRecord.findOne({ studentId }).lean();
//     return student;
//   };
// const findStudentAttendanceByslotId = async (slotId) => {
//     const student = await AttendanceRecord.findOne({ slotId }).lean();
//     return student;
//   };
// const findStudentRecordByslotId = async (slotId) => {
//     const studentRecordCount = await AttendanceRecord.find({slotId:slotId}).count();
//     const studentAttendance = await AttendanceRecord.find({slotId:slotId});
//     const studentRecord={studentRecordCount,studentAttendance}
//     return studentRecord;
//   };
// module.exports={
//     createAttendanceRecord,
//     findStudentAccountById,
//     findStudentAttendanceByslotId,
//     findStudentRecordByslotId
// }