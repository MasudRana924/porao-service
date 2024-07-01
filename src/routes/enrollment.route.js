const express = require("express");
const router = express.Router();
const { studentAuthenticate, teacherAuthenticate } = require("../middleware/authenticate");
const { createEnrollment, getEnrollmentsByBatchAndTeacher, updateEnrollmentStatus, getEnrollmentBySTudentId, getEnrollmentByTeacherId, getStudentsByBatchId, getStudentPendingEnrollment,getStudentRejectedEnrollment,getStudentApprovedEnrollment } = require("../controllers/enrollment.controller");
router.post("/create/new",studentAuthenticate,createEnrollment);
router.get("/get/enrollments/:batchId",teacherAuthenticate,getEnrollmentsByBatchAndTeacher);
router.patch('/update/:enrollmentId', teacherAuthenticate,updateEnrollmentStatus);
router.get('/student', studentAuthenticate,getEnrollmentBySTudentId);
router.get('/teacher', teacherAuthenticate,getEnrollmentByTeacherId);
router.get('/:batchId', teacherAuthenticate,getStudentsByBatchId);
router.get('/student/pending', studentAuthenticate,getStudentPendingEnrollment);
router.get('/student/reject', studentAuthenticate,getStudentRejectedEnrollment);
router.get('/student/approved', studentAuthenticate,getStudentApprovedEnrollment);

module.exports = router;