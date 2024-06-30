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
  const batch = await BatchModel.findOne({batchId:batchId});
  return batch;
};
const getAllBatch = async () => {
  const post = await BatchModel.aggregate([
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
          $project: {
              _id: 0,
              teacherId: 0,
          },
      },
  ]);
  return post;
};
module.exports = {
  createBatch,
  getBatchesByTeacher,
  getBatchById,
  getAllBatch
};