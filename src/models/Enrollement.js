const EnrollmentModel = require('../schema/enrollmentSchema')
const createEnrollment = async (data) => {
    const newEnrollment = new EnrollmentModel(data);
    const createdEnrollment = await newEnrollment.save();
    return createdEnrollment;
  };
  
  const getEnrollmentsByStudent = async (studentId) => {
    const enrollments = await EnrollmentModel.find({ student: studentId });
    return enrollments;
  };
  
  const getEnrollmentById = async (enrollmentId) => {
    const enrollment = await EnrollmentModel.findById(enrollmentId);
    return enrollment;
  };
  
  const getEnrollmentsByBatch = async (batchId) => {
    const enrollments = await EnrollmentModel.find({ batch: batchId });
    return enrollments;
  };
  
  const updateEnrollmentStatus = async (enrollmentId, status) => {
    const enrollment = await EnrollmentModel.findById(enrollmentId);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
    enrollment.status = status;
    await enrollment.save();
    return enrollment;
  };
  
  module.exports = {
    createEnrollment,
    getEnrollmentsByStudent,
    getEnrollmentById,
    getEnrollmentsByBatch,
    updateEnrollmentStatus
  };