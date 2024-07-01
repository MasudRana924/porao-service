const express = require("express");
const router = express.Router();

const { createBatch ,getBatchesByTeacherId, getAllBatches,getBatchById} = require("../controllers/batch.controller");
const { teacherAuthenticate } = require("../middleware/authenticate");
router.post("/create/new",teacherAuthenticate,createBatch);
router.get("/all",teacherAuthenticate,getBatchesByTeacherId);
router.get("/all/batches",getAllBatches);
router.get("/:batchId",teacherAuthenticate,getBatchById);

module.exports = router;