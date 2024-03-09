const AttendanceRecord = require("../schema/attendanceSchema");
const createAttendanceRecord = async (data) => {
  const newAttendanceRecord = new AttendanceRecord(data);
  const createdAttendanceRecord = await newAttendanceRecord.save();
  return createdAttendanceRecord;
};

const findStudentAccountById = async (studentId) => {
    const student = await AttendanceRecord.findOne({ studentId }).lean();
    return student;
  };
const findStudentAttendanceByslotId = async (slotId) => {
    const student = await AttendanceRecord.findOne({ slotId }).lean();
    return student;
  };
const findStudentRecordByslotId = async (slotId) => {
    const studentRecordCount = await AttendanceRecord.find({slotId:slotId}).count();
    const studentAttendance = await AttendanceRecord.find({slotId:slotId});
    const studentRecord={studentRecordCount,studentAttendance}
    return studentRecord;
  };
module.exports={
    createAttendanceRecord,
    findStudentAccountById,
    findStudentAttendanceByslotId,
    findStudentRecordByslotId
}