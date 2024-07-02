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

// const getAttendanceByBatchnadStudentId = async (req, res) => {
//   try {
//     const { batchId } = req.params;
//     const { studentId } = req.user;
//     console.log("batchId",batchId);
//     console.log("batchId",studentId);
//     const attendance = await AttendanceModel.getAttendanceByBatchnadStudentId(batchId,studentId);
//     res.success(attendance, 'Attendance fetched successfully');
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };

const getAttendanceByBatchnadStudentId = async (req, res) => {
  try {
    const { batchId, page, perPage } = req.query;
    console.log("batchId",req.query);
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(perPage, 10) || 4;
    const { studentId } = req.user;
    console.log("studentId",studentId);
    const { results, totalResult } = await AttendanceModel.getAttendanceByBatchnadStudentId(batchId, currentPage, itemsPerPage,studentId);
    const allResults = {
      results,
      totalResult,
    };
    res.success(allResults, "Attendance Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

// Controller
const getAttendanceOfLastThreeMonths = async (req, res) => {
  try {
    const { studentId } = req.user;
    const currentMonth = new Date().getMonth(); // get current month (0-11)
    const currentYear = new Date().getFullYear();

    const threeMonthsAgo = new Date(currentYear, currentMonth - 3, 1); // 3 months ago
    console.log("currentMonth", currentMonth);
    console.log("currentYear", currentYear);
    console.log("threeMonthsAgo", threeMonthsAgo);

    const filter = {
      studentId: studentId,
      date: {
        $gte: threeMonthsAgo, 
        $lt: new Date(),
      },
    };

    const attendance = await AttendanceModel.getAttendanceByStudentLastMonth(filter);

    // Initialize attendanceByMonth with 0 for each month
    const attendanceByMonth = {};
    for (let i = 0; i < 3; i++) {
      const month = currentMonth - i + 1;
      const year = currentYear;
      if (month < 1) {
        month += 12;
        year -= 1;
      }
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      attendanceByMonth[key] = 0;
    }

    // Count attendance for each month
    attendance.forEach((item) => {
      const month = item.date.getMonth() + 1;
      const year = item.date.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      attendanceByMonth[key]++;
    });

    res.success(attendanceByMonth, 'Attendance of last 3 months fetched successfully');
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceOfLastThreeMonths,
  getAttendanceByBatchnadStudentId
};