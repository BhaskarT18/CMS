const courseDAO = require("./dao");
const { validateStudent } = require("./validation");

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await courseDAO.getAllCourses();
      res.status(200).json(courses);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  };

  exports.getCourseById = async (req, res) => {
    try {
      const course = await courseDAO.getCourseById(req.params.id);
  
      if (!course) return res.status(404).json({ message: "Course not found" });
  
      res.status(200).json(course);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  };

  exports.upsertCourse = async (req, res) => {
    try {
      let body = req.body;
  
      let result = await courseDAO.upsertCourse(body);
  
      if (result.status) {
        res.status(200).json({
          statusCode: 200,
          message: result.message,
          courseId: result.courseId || body.id,
        });
      } else {
        res.status(500).json({ statusCode: 500, errors: result.errors });
      }
    } catch (error) {
      console.error("Error on upsertCourse:", error.message);
      res.status(500).json({
        statusCode: 500,
        error: "An error occurred. Please try again later.",
      });
    }
  };

exports.deleteCourse = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await courseDAO.deleteCourseById(id);
  
      if (!result) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      console.log("Deleted Course ID:", id);
      res.status(200).json({ message: "Course deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };


exports.getAllCoursesView = async (req, res) => {
    try {
      const courses = await courseDAO.getAllCoursesView();
      
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: "No active courses found" });
      }
  
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };


  exports.updateCourseStatus = async (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({
            status: false,
            message: "Course ID and status are required",
        });
    }

    const result = await courseDAO.updateCourseStatus({ id, status });

    if (result.status) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};
