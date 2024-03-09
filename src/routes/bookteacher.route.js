const express = require("express");
const router = express.Router();
const { studentAuthenticate, teacherAuthenticate } = require("../middleware/authenticate");
const { bookTeacher, updateBookedteacherStatus } = require("../controllers/bookteacher.controller");
router.post("/teacher",studentAuthenticate,bookTeacher);
router.post("/update/status/:bookingId",teacherAuthenticate,updateBookedteacherStatus);

module.exports = router;