const AttendanceModel = require('../schema/attendanceSchema');

const createAttendance = async (data) => {
  const newAttendance = new AttendanceModel(data);
  const createdAttendance = await newAttendance.save();
  return createdAttendance;
};

const getAttendanceByStudent = async (studentId) => {
  console.log("studentId",studentId);
  const attendance = await AttendanceModel.find({ studentId: studentId });
  return attendance;
};
// Model
const getAttendanceByStudentLastMonth = async (filter) => {
  console.log("filter", filter);
  const attendance = await AttendanceModel.find(filter);
  return attendance;
};

const getAttendanceByBatchnadStudentId = async (batchId,studentId) => {
  const attendance = await AttendanceModel.find({ batchId: batchId,studentId:studentId });
  return attendance;
};

module.exports = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByStudentLastMonth,
  getAttendanceByBatchnadStudentId
};
