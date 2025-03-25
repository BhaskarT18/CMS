const express = require("express");
const router = express.Router();
const coursesController = require("./controller");

router.post("/save", coursesController.upsertCourse);
router.get("/list", coursesController.getAllCourses);
router.get("/get/:id", coursesController.getCourseById);
router.post("/delete/:id", coursesController.deleteCourse);
router.get("/view/:id", coursesController.getAllCoursesView);
// router.post("/changeStatus", coursesController.updateCourseStatus);

module.exports = router;
