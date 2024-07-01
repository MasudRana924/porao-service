const EnrollmentModel = require('../models/Enrollement')
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const { statusCodes } = require("../helper/statusCodes.js");
const createEnrollment = async (req, res) => {
  try {
    const { teacherId, batchId } = req.body;
    const { studentId } = req.user;
    const data = { studentId, teacherId, batchId };
    const createdEnrollment = await EnrollmentModel.createEnrollment(data);
    res.status(201).json({
      message: 'Enrollment created successfully',
      enrollment: createdEnrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getEnrollmentsByBatchAndTeacher = async (req, res) => {
  try {
    const { batchId } = req.params;
    const {teacherId}=req.user;
    const enrollments = await EnrollmentModel.getEnrollmentsByBatchAndTeacher(batchId, teacherId);
    res.status(200).json({
      message: 'Enrollments fetched successfully',
      enrollments
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { status } = req.body;
    console.log("status",status)
    const updatedEnrollment = await EnrollmentModel.updateEnrollmentStatus(enrollmentId, status);
    res.status(200).json({
      message: 'Enrollment status updated successfully',
      enrollment: updatedEnrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};


const getEnrollmentBySTudentId = async (req, res) => {
  try {
    const { studentId } = req.user;
    const enrollments = await EnrollmentModel.getEnrollmentBySTudentId(studentId);
    res.json({
      message: 'Enrollments fetched successfully',
      enrollments
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

// teacher enrollment
const getEnrollmentByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.user;
    const enrollments = await EnrollmentModel.getEnrollmentByTeacherId(teacherId);
    res.json({
      message: 'Enrollments fetched successfully',
      enrollments
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getStudentsByBatchId = async (req, res) => {
  try {
    const { batchId } = req.params;
    console.log("batchId",batchId);
    const students = await EnrollmentModel.getStudentDetailsByBatchId(batchId);
    console.log('Students:', students);

    if (!students.length) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40406,
        },
      });
    }
    res.json({
      message: 'Students fetched successfully',
      students
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getStudentPendingEnrollment = async (req, res) => {
  try {
    const { studentId } = req.user;
    const results = await EnrollmentModel.studentPendingEnrollment(studentId);
    res.success(results, "Student pending get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getStudentApprovedEnrollment = async (req, res) => {
  try {
    const { studentId } = req.user;
    const results = await EnrollmentModel.studentApprovedEnrollment(studentId);
    res.success(results, "Student pending get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getStudentRejectedEnrollment = async (req, res) => {
  try {
    const { studentId } = req.user;
    const results = await EnrollmentModel.studentRejectEnrollment(studentId);
    res.success(results, "Student pending get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  createEnrollment,
  getEnrollmentsByBatchAndTeacher,
  updateEnrollmentStatus,
  getEnrollmentBySTudentId,
  getEnrollmentByTeacherId,
  getStudentsByBatchId,
  getStudentPendingEnrollment,
  getStudentApprovedEnrollment,
  getStudentRejectedEnrollment
}