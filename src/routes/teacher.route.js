const { Router } = require("express");
const {
  teacherRegistration,
  teacherLogin,
  changeTeacherPassword,
  updateTeacherSlots,
  getSingleTeacher,
  getAllTeachers,
  tutorProfileUpdate,
  verifyTeacher,
} = require("../controllers/teacher.controller");
const { teacherAuthenticate } = require("../middleware/authenticate");
const { findteacherBookingById, findBookingBySlotId } = require("../controllers/bookteacher.controller");
const router = Router();
const multer = require('multer');
const { createPost, getAllPost } = require("../controllers/post.controller");
const upload = multer({
  dest: "tmp/",
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});
router.post("/register", teacherRegistration);
router.post("/verify", verifyTeacher);
router.post("/login", teacherLogin);
router.put("/change-password", teacherAuthenticate, changeTeacherPassword);
router.put("/update/profile",upload.single("image"),teacherAuthenticate,tutorProfileUpdate);
router.put("/update-slot", teacherAuthenticate, updateTeacherSlots);
router.get("/all", getAllTeachers);
router.get("/:teacherId", getSingleTeacher);
router.get("/booking", teacherAuthenticate, findteacherBookingById);
router.get("/booking/slotId", teacherAuthenticate, findBookingBySlotId);

// teacher post routes
router.post("/tuition/post",teacherAuthenticate,createPost);
router.get("/tuition/post",getAllPost);
module.exports = router;
