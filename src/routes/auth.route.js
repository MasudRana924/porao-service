const { Router } = require("express");
const {
    studentRegistration,
    studentLogin,
    changePassword
} = require("../controllers/student.controller");
const { studentAuthenticate } = require("../middleware/authenticate");
const { findBookingByStudentId } = require("../controllers/bookteacher.controller");
const router = Router();
router.post("/student/register", studentRegistration);
router.post("/student/login", studentLogin);
router.post("/student/change-password",studentAuthenticate,changePassword);
router.get("/student/booking",studentAuthenticate,findBookingByStudentId);
module.exports = router;