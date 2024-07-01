const express = require("express");
const router = express.Router();
const {teacherAuthenticate, studentAuthenticate } = require("../middleware/authenticate");
const { createAttendance } = require("../controllers/attendance.controller");
router.post("/record/student/attendance",teacherAuthenticate,  createAttendance
);
module.exports = router;