const express = require("express");
const router = express.Router();

const studentRouter = require("../component/students/router");
const dashboardRouter = require("../component/dashboard/router");
const courseRouter = require("../component/courses/router");
const instructorRouter = require("../component/intructors/router");

router.use("/students", studentRouter);
router.use("/dashboard", dashboardRouter);
router.use("/courses", courseRouter);
router.use("/instructor", instructorRouter);

module.exports = router;
