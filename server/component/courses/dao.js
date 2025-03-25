const { sequelize } = require("../../db");

exports.getAllCourses = async () => {
    const query = `SELECT * FROM courses WHERE is_deleted = 'active'`;
    const [courses] = await sequelize.query(query);
    return courses;
  };

  exports.getCourseById = async (id) => {
    id = Number(id);
    const query = `SELECT * FROM courses WHERE id = ? AND LOWER(is_deleted) = 'active'`;
    const [courses] = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });
  
    return courses
  };

  exports.deleteCourseById = async (id) => {
    const query = `UPDATE courses SET is_deleted = 'inactive', deleted_on = NOW() WHERE id = ?`;
    const [result] = await sequelize.query(query, { replacements: [id] });
  
    return result.affectedRows > 0; // Returns true if at least one row was affected
  };

  exports.upsertCourse = async (data) => {
    const {
        id,
        course_name,
        description,
        course_fee,
        start_date,
        end_date,
        created_by,
        modified_by
    } = data;

    try {
        if (id) {
            // Update existing course
            const query = `
                UPDATE courses 
                SET course_name = ?, description = ?, course_fee = ?, start_date = ?, 
                    end_date = ?, modified_by = ?, modified_at = NOW() 
                WHERE id = ? AND is_deleted = 'active'
            `;
        
            const [result] = await sequelize.query(query, {
                replacements: [
                    course_name || null,
                    description || null,
                    course_fee || 0,
                    start_date || null,
                    end_date || null,
                    modified_by || null,
                    id
                ],
            });

            return {
                status: result.affectedRows > 0,
                message: result.affectedRows > 0
                    ? "Course updated successfully"
                    : "Course not found or update failed",
            };
        } else {
            // Insert new course
            const query = `
                INSERT INTO courses 
                (course_name, description, course_fee, start_date, end_date, created_by, created_at, modified_at, is_deleted) 
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
            `;

            const [result] = await sequelize.query(query, {
                replacements: [
                    course_name || null,
                    description || null,
                    course_fee || 0,
                    start_date || null,
                    end_date || null,
                    created_by || null,
                    "active"
                ],
            });

            return {
                status: true,
                message: "Course created successfully",
                courseId: result.insertId,
            };
        }
    } catch (error) {
        console.error("Database Error:", error);
        return { status: false, errors: ["Database Insert/Update Failed"] };
    }
};

  exports.getAllCoursesView = async () => {
    const query = `
      SELECT 
        id AS course_id,
        course_name,
        description AS course_description,
        course_fee,
        start_date,
        end_date,
        is_deleted
      FROM courses
      WHERE LOWER(is_deleted) = 'active'
    `;
  
    const courses = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
  
    console.log("Courses:", courses);
    return courses;
  };


  exports.updateCourseStatus = async (data) => {
    const { id, status } = data;

    try {
        // Ensure status is valid
        const validStatuses = ["ongoing", "completed", "upcoming"];
        if (!validStatuses.includes(status)) {
            return { status: false, message: "Invalid status provided" };
        }

        // Update course status
        const query = `
            UPDATE courses 
            SET is_deleted = ?, modified_at = NOW() 
            WHERE id = ?
        `;

        const [result] = await sequelize.query(query, {
            replacements: [status, id],
        });

        return {
            status: result.affectedRows > 0,
            message: result.affectedRows > 0
                ? "Course status updated successfully"
                : "Course not found or update failed",
        };
    } catch (error) {
        console.error("Database Error:", error);
        return { status: false, errors: ["Database Update Failed"] };
    }
};