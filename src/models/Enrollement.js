const EnrollmentModel = require('../schema/enrollmentSchema')
const createEnrollment = async (data) => {
  const newEnrollment = new EnrollmentModel(data);
  const createdEnrollment = await newEnrollment.save();
  return createdEnrollment;
};
const getEnrollmentsByBatchAndTeacher = async (batchId, teacherId) => {
  const enrollments = await EnrollmentModel.aggregate([
    { $match: { batchId, teacherId } },
    {
      $lookup: {
        from: 'studentaccounts', // Collection name in MongoDB
        localField: 'studentId',
        foreignField: 'studentId',
        as: 'studentDetails'
      }
    },
    { $unwind: '$studentDetails' } // Flatten the array resulting from $lookup
  ]);
  return enrollments;
};
const updateEnrollmentStatus = async (enrollmentId, status) => {
  const enrollment = await EnrollmentModel.findOne({ enrollmentId});
  console.log("enrollment",enrollment);
  // if (!enrollment) {
  //   throw new Error('Enrollment not found or you are not authorized to update this enrollment');
  // }
  enrollment.status = status;
  await enrollment.save();
  return enrollment;
};
module.exports = {
  createEnrollment,
  getEnrollmentsByBatchAndTeacher,
  updateEnrollmentStatus
};