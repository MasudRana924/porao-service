const BatchModel = require('../schema/batchSchema');

const createBatch = async (data) => {
  const newBatch = new BatchModel(data);
  const createdBatch = await newBatch.save();
  return createdBatch;
};

const getBatchesByTeacher = async (teacherId) => {
  const batches = await BatchModel.find({ teacher: teacherId });
  return batches;
};

const getBatchById = async (batchId) => {
  const batch = await BatchModel.findById(batchId);
  return batch;
};

const getBatchesByStudent = async (studentId) => {
  const batches = await BatchModel.find({ students: studentId });
  return batches;
};

module.exports = {
  createBatch,
  getBatchesByTeacher,
  getBatchById,
  getBatchesByStudent
};