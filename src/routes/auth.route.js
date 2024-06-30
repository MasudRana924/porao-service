const { Router } = require("express");
const {
    studentRegistration,
    studentLogin,
    changePassword,
    studentProfileUpdate
} = require("../controllers/student.controller");
const { studentAuthenticate } = require("../middleware/authenticate");
const { findBookingByStudentId } = require("../controllers/bookteacher.controller");
const multer = require('multer');
const upload = multer({
    dest: "tmp/",
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
const router = Router();
router.post("/student/register", studentRegistration);
router.post("/student/login", studentLogin);
router.post("/student/change-password", studentAuthenticate, changePassword);
router.get("/student/booking", studentAuthenticate, findBookingByStudentId);
router.put("/student/update/profile", upload.single("image"), studentAuthenticate, studentProfileUpdate);
module.exports = router;