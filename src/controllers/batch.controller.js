// const { createBatch, getBatchesByTeacher, getBatchById, getBatchesByStudent } = require('../models/batch.model');
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const BatchModel = require("../models/Batch");


const createBatch = async (req, res) => {
  try {
    const { name, description,capacity, subjects, days } = req.body;
    console.log(req.body)
    const { teacherId } = req.user;
    const data = { name, description, teacherId, capacity, subjects, days };
    const createdBatch = await BatchModel.createBatch(data);
    res.status(201).json({
      message: 'Batch created successfully',
      batch: createdBatch
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getBatchesByTeacherController = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const batches = await BatchModel.getBatchesByTeacher(teacherId);
    res.json({
      message: 'Batches fetched successfully',
      batches
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getBatchByIdController = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await BatchModel.getBatchById(batchId);
    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }
    res.json({
      message: 'Batch fetched successfully',
      batch
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};



module.exports = {
  createBatch,
  getBatchesByTeacherController,
  getBatchByIdController
};