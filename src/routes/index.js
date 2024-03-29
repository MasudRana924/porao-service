const express = require("express");
const authRoute = require("./auth.route.js");
const teacherRoute = require("./teacher.route.js");
const slotRoute = require("./slots.route.js");
const bookTeacherRoute = require("./bookteacher.route.js");
const attendanceRoute = require("./attendance.route.js");
const router = express.Router();
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/teacher",
    route: teacherRoute,
  },
  {
    path: "/slot",
    route: slotRoute,
  },
  {
    path: "/book",
    route: bookTeacherRoute,
  },
  {
    path: "/attendance",
    route: attendanceRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;