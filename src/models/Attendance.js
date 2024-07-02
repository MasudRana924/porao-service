const AttendanceModel = require("../schema/attendanceSchema");

const createAttendance = async (data) => {
  const newAttendance = new AttendanceModel(data);
  const createdAttendance = await newAttendance.save();
  return createdAttendance;
};

const getAttendanceByStudent = async (studentId) => {
  console.log("studentId", studentId);
  const attendance = await AttendanceModel.find({ studentId: studentId });
  return attendance;
};
// Model
const getAttendanceByStudentLastMonth = async (filter) => {
  console.log("filter", filter);
  const attendance = await AttendanceModel.find(filter);
  return attendance;
};

// const getAttendanceByBatchnadStudentId = async (batchId,studentId, page = 1, perPage) => {
//   const attendance = await AttendanceModel.find({ batchId: batchId,studentId:studentId });
//   return attendance;
// };
const getAttendanceByBatchnadStudentId = async (
  batchId,
  page = 1,
  perPage,
  studentId,
) => {
  const query = { batchId, studentId };
  console.log("quer", query);
  console.log("studentId", studentId);
  const skip = (page - 1) * perPage;
  const results = await AttendanceModel.find(query)
    .skip(skip)
    .limit(parseInt(perPage, 10))
    .sort({ createdAt: -1 });
  const totalResult = await AttendanceModel.countDocuments(query);
  console.log("totalResult",totalResult)
  return { results, totalResult };
};
module.exports = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByStudentLastMonth,
  getAttendanceByBatchnadStudentId,
};
