const { createBatch, getBatchesByTeacher, getBatchById, getBatchesByStudent } = require('../models/batch.model');
const { errorResponseHandler } = require('../utils/errorHandler');

const createBatchController = async (req, res) => {
  try {
    const { name, description, teacher, students, subjects, days } = req.body;
    const data = { name, description, teacher, students, subjects, days };
    const createdBatch = await createBatch(data);
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
    const batches = await getBatchesByTeacher(teacherId);
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
    const batch = await getBatchById(batchId);
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

const getBatchesByStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const batches = await getBatchesByStudent(studentId);
    res.json({
      message: 'Batches fetched successfully',
      batches
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const enrollStudentInBatchController = async (req, res) => {
  try {
    const { batchId, studentId } = req.body;
    const batch = await getBatchById(batchId);
    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }
    batch.students.push(studentId);
    await batch.save();
    res.json({
      message: 'Student enrolled in batch successfully'
    });
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  createBatchController,
  getBatchesByTeacherController,
  getBatchByIdController,
  getBatchesByStudentController,
  enrollStudentInBatchController
};