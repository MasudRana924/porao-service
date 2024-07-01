const EnrollmentModel = require("../schema/enrollmentSchema");
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
        from: "studentaccounts", // Collection name in MongoDB
        localField: "studentId",
        foreignField: "studentId",
        as: "studentDetails",
      },
    },
    { $unwind: "$studentDetails" }, // Flatten the array resulting from $lookup
  ]);
  return enrollments;
};



const updateEnrollmentStatus = async (enrollmentId, status) => {
  const enrollment = await EnrollmentModel.findOne({ enrollmentId });
  console.log("enrollment", enrollment);
  // if (!enrollment) {
  //   throw new Error('Enrollment not found or you are not authorized to update this enrollment');
  // }
  enrollment.status = status;
  await enrollment.save();
  return enrollment;
};
const getEnrollmentBySTudentId = async (studentId) => {
  const enrollments = await EnrollmentModel.aggregate([
    {
      $match: { studentId: studentId },
    },
    {
      $lookup: {
        from: "teacheraccounts",
        localField: "teacherId",
        foreignField: "teacherId",
        as: "teacherInfo",
      },
    },
    {
      $unwind: "$teacherInfo",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: 'batches',
        localField: 'batchId',
        foreignField: 'batchId',
        as: 'batchInfo'
      }
    },
    {
      $unwind: '$batchInfo'
    },
    {
      $project: {
        _id: 0,
        teacherId: 0,
        batchId: 0,
      },
    },
  ]);
  return enrollments;
};


// teacher enrollment
const getEnrollmentByTeacherId = async (teacherId) => {
  const enrollments = await EnrollmentModel.aggregate([
    {
      $match: { teacherId: teacherId },
    },
    {
      $lookup: {
        from: "studentaccounts",
        localField: "studentId",
        foreignField: "studentId",
        as: "studentInfo",
      },
    },
    {
      $unwind: "$studentInfo",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: 'batches',
        localField: 'batchId',
        foreignField: 'batchId',
        as: 'batchInfo'
      }
    },
    {
      $unwind: '$batchInfo'
    },
    {
      $project: {
        _id: 0,
        studentId: 0,
        batchId: 0,
      },
    },
  ]);
  return enrollments;
};


const getStudentDetailsByBatchId = async (batchId) => {
  const enrollments=await EnrollmentModel.aggregate([
    { $match: { batchId: batchId } },
    {
      $lookup: {
        from: 'studentaccounts',
        localField: 'studentId',
        foreignField: 'studentId',
        as: 'studentDetails'
      }
    },
    { $unwind: '$studentDetails' },
    {
      $lookup: {
        from: 'batches',
        localField: 'batchId',
        foreignField: 'batchId',
        as: 'batchDetails'
      }
    },
    { $unwind: '$batchDetails' },
    {
      $project: {
        _id: 0,
        studentId:0,
        batchId:0,
      }
    }
  ]);
  return enrollments
};
module.exports = {
  createEnrollment,
  getEnrollmentsByBatchAndTeacher,
  updateEnrollmentStatus,
  getEnrollmentBySTudentId,
  getEnrollmentByTeacherId,
  getStudentDetailsByBatchId
};
