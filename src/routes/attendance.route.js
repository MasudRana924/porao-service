const express = require("express");
const router = express.Router();
const {teacherAuthenticate, studentAuthenticate } = require("../middleware/authenticate");
const { createAttendance, getAttendanceByStudent,getAttendanceOfLastThreeMonths, getAttendanceByBatchnadStudentId } = require("../controllers/attendance.controller");
router.post("/record/student/attendance",teacherAuthenticate,  createAttendance
);
router.get("/student/attendance",studentAuthenticate,  getAttendanceByStudent);
router.get("/student/attendance/:batchId",studentAuthenticate,  getAttendanceByBatchnadStudentId);
router.get('/student/last-three-months', studentAuthenticate,getAttendanceOfLastThreeMonths);
module.exports = router;