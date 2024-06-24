const { createEnrollment, getEnrollmentsByStudent, getEnrollmentById, getEnrollmentsByBatch, updateEnrollmentStatus } = require('../models/enrollment.model');
const { errorResponseHandler } = require('../utils/errorHandler');

const createEnrollmentController = async (req, res) => {
  try {
    const { studentId, batchId } = req.body;
    const data = { student: studentId, batch: batchId };
    const createdEnrollment = await createEnrollment(data);
    res.status(201).json({
      message: 'Enrollment created successfully',
      enrollment: createdEnrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getEnrollmentsByStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const enrollments = await getEnrollmentsByStudent(studentId);
    res.json({
      message: 'Enrollments fetched successfully',
      enrollments
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getEnrollmentByIdController = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await getEnrollmentById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        message: 'Enrollment not found'
      });
    }
    res.json({
      message: 'Enrollment fetched successfully',
      enrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getEnrollmentsByBatchController = async (req, res) => {
  try {
    const { batchId } = req.params;
    const enrollments = await getEnrollmentsByBatch(batchId);
    res.json({
      message: 'Enrollments fetched successfully',
      enrollments
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const acceptEnrollmentController = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await updateEnrollmentStatus(enrollmentId, 'approved');
    res.json({
      message: 'Enrollment accepted successfully',
      enrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const rejectEnrollmentController = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await updateEnrollmentStatus(enrollmentId, 'rejected');
    res.json({
      message: 'Enrollment rejected successfully',
      enrollment
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  createEnrollmentController,
  getEnrollmentsByStudentController,
  getEnrollmentByIdController,
  getEnrollmentsByBatchController,
  acceptEnrollmentController,
}