const express = require("express");
const router = express.Router();
const {teacherAuthenticate, studentAuthenticate } = require("../middleware/authenticate");
const { createAttendance, getAttendanceByStudent } = require("../controllers/attendance.controller");
router.post("/record/student/attendance",teacherAuthenticate,  createAttendance
);
router.get("/student/attendance",studentAuthenticate,  getAttendanceByStudent);
module.exports = router;