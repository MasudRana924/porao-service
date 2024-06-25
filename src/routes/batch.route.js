const express = require("express");
const router = express.Router();

const { createBatch ,getBatchesByTeacherId} = require("../controllers/batch.controller");
const { teacherAuthenticate } = require("../middleware/authenticate");
router.post("/create/new",teacherAuthenticate,createBatch);
router.get("/all",teacherAuthenticate,getBatchesByTeacherId);

module.exports = router;