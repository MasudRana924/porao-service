const BatchModel = require('../schema/batchSchema');
const createBatch = async (data) => {
  const newBatch = new BatchModel(data);
  const createdBatch = await newBatch.save();
  return createdBatch;
};
const getBatchesByTeacher = async (teacherId) => {
  const batches = await BatchModel.find({ teacherId: teacherId });
  return batches;
};
const getBatchById = async (batchId) => {
  const batch = await BatchModel.findById(batchId);
  return batch;
};
module.exports = {
  createBatch,
  getBatchesByTeacher,
  getBatchById
};