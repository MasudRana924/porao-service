const { Router } = require("express");
const {teacherAuthenticate } = require("../middleware/authenticate");
const { createSLots } = require("../controllers/slots.controller");
const router = Router();
router.post("/create",teacherAuthenticate, createSLots);
module.exports = router;