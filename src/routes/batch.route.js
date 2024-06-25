const express = require("express");
const router = express.Router();
const {teacherAuthenticate} = require("../middleware/authenticate");
const { createBatch } = require("../controllers/batch.controller");
router.post("/create/new",createBatch);

module.exports = router;