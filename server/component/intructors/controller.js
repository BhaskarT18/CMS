const InstructorDAO = require("./dao");
const { validateStudent } = require("./validation");

exports.getAllInstructors = async (req, res) => {
    try {
      const instructors = await InstructorDAO.getAllInstructors();
      res.status(200).json(instructors);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };



exports.getInstructorById = async (req, res) => {
    try {
      const instructor = await InstructorDAO.getInstructorById(req.params.id);
  
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
  
      res.status(200).json(instructor);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };



  exports.deleteInstructor = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await InstructorDAO.deleteInstructorById(id);
  
      if (!result) return res.status(404).json({ message: "Instructor not found" });
  
      console.log("Deleted ID:", id, "Result:", result);
      res.status(200).json({ message: "Instructor deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };
  
  exports.upsertInstructor = async (req, res) => {
    try {
      let body = req.body;
  
    
      let result = await InstructorDAO.upsertInstructor(body);
  
      if (result.status) {
        res.status(200).json({
          statusCode: 200,
          message: result.message,
          instructorId: result.instructorId || body.id,
        });
      } else {
        res.status(500).json({ statusCode: 500, errors: result.errors });
      }
    } catch (error) {
      console.error("Error on upsertInstructor:", error.message);
      res.status(500).json({
        statusCode: 500,
        error: "An error occurred. Please try again later.",
      });
    }
  };
  

  exports.getInstructorViewById = async (req, res) => {
    try {
      const instructorDetails = await InstructorDAO.getInstructorViewById(req.params.id);
      console.log("Instructor Details:", req.params.id, instructorDetails);
  
      if (!instructorDetails) {
        return res.status(404).json({ message: "Instructor not found" });
      }
  
      res.status(200).json({
        statusCode: 200,
        message: "Instructor details retrieved successfully",
        data: instructorDetails,
      });
    } catch (err) {
      console.error("Error fetching instructor details:", err.message);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  
  

  exports.updateInstructorStatus = async (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({
            status: false,
            message: "Instructor ID and status are required",
        });
    }

    const result = await InstructorDAO.updateInstructorStatus({ id, status });

    if (result.status) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};