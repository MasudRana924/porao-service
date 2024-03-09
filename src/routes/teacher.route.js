const { Router } = require("express");
const multer = require('multer');
const storage= multer.memoryStorage();
const upload = multer({
  dest: "tmp/",
  storage:storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});
const {
  teacherRegistration,
  teacherLogin,
  changeTeacherPassword,
  updateTeacherSlots,
  getSingleTeacher,
  getAllTeachers,
  tutorProfileUpdate,
} = require("../controllers/teacher.controller");
const { teacherAuthenticate } = require("../middleware/authenticate");
const { findteacherBookingById, findBookingBySlotId } = require("../controllers/bookteacher.controller");

const router = Router();
router.post("/register", teacherRegistration);
router.post("/login", teacherLogin);
router.put("/change-password", teacherAuthenticate, changeTeacherPassword);
router.put("/update/profile",upload.single("image"),teacherAuthenticate,tutorProfileUpdate);
router.put("/update-slot", teacherAuthenticate, updateTeacherSlots);
router.get("/all", getAllTeachers);
router.get("/:teacherId", getSingleTeacher);
router.get("/booking", teacherAuthenticate, findteacherBookingById);
router.get("/booking/slotId", teacherAuthenticate, findBookingBySlotId);
module.exports = router;
