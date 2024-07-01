const express = require("express");
const router = express.Router();
const { studentAuthenticate, teacherAuthenticate } = require("../middleware/authenticate");
const { createEnrollment, getEnrollmentsByBatchAndTeacher, updateEnrollmentStatus, getEnrollmentBySTudentId, getEnrollmentByTeacherId, getStudentsByBatchId } = require("../controllers/enrollment.controller");
router.post("/create/new",studentAuthenticate,createEnrollment);
router.get("/get/enrollments/:batchId",teacherAuthenticate,getEnrollmentsByBatchAndTeacher);
router.patch('/update/:enrollmentId', teacherAuthenticate,updateEnrollmentStatus);
router.get('/student', studentAuthenticate,getEnrollmentBySTudentId);
router.get('/teacher', teacherAuthenticate,getEnrollmentByTeacherId);
router.get('/:batchId', teacherAuthenticate,getStudentsByBatchId);

module.exports = router;