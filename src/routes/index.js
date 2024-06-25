const express = require("express");
const authRoute = require("./auth.route.js");
const devRoute = require("./dev.route.js");
const teacherRoute = require("./teacher.route.js");
const slotRoute = require("./slots.route.js");
const bookTeacherRoute = require("./bookteacher.route.js");
const attendanceRoute = require("./attendance.route.js");
const batchRoute = require("./batch.route.js");
const router = express.Router();
const defaultRoutes = [
  {
    path: '/dev',
    route: devRoute,
  },
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
  {
    path: "/batch",
    route: batchRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;