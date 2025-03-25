const express = require("express");
const router = express.Router();
const instructorController = require("./controller");

router.post("/save", instructorController.upsertInstructor);
router.get("/list", instructorController.getAllInstructors);
router.get("/get/:id", instructorController.getInstructorById);
router.post("/delete/:id", instructorController.deleteInstructor);
router.get("/view/:id", instructorController.getInstructorViewById);
router.post("/updateStatus", instructorController.updateInstructorStatus);

module.exports = router;
