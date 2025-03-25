const { sequelize } = require("../../db");

exports.getAllInstructors = async () => {
  const query = `SELECT * FROM intructors WHERE is_deleted = 'active'`;
  const [instructors] = await sequelize.query(query);
  return instructors;
};

exports.getInstructorById = async (id) => {
  id = Number(id);
  const query = `SELECT * FROM intructors WHERE id = ? AND LOWER(is_deleted) = 'active'`;
  const [instructor] = await sequelize.query(query, {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT,
  });

  return instructor;
};

exports.deleteInstructorById = async (id) => {
  const query = `UPDATE intructors SET is_deleted = 'inactive', deleted_on = NOW() WHERE id = ?`;
  const [result] = await sequelize.query(query, { replacements: [id] });

  return result.affectedRows > 0;
};

exports.upsertInstructor = async (data) => {
  const {
    id,
    first_name,
    last_name,
    email,
    phone_no,
    join_date,
    course_id,
    created_by,
    modified_by,
  } = data;

  try {
    if (id) {
      // Update existing instructor
      const query = `
          UPDATE intructors 
          SET first_name = ?, last_name = ?, email = ?, phone_no = ?, join_date = ?, 
              course_id = ?, modified_by = ?, modified_at = NOW() 
          WHERE id = ? AND is_deleted = 'active'
        `;

      const [result] = await sequelize.query(query, {
        replacements: [
          first_name,
          last_name,
          email,
          phone_no,
          join_date,
          course_id,
          modified_by,
          id,
        ],
      });

      return {
        status: result.affectedRows > 0,
        message:
          result.affectedRows > 0
            ? "Instructor updated successfully"
            : "Instructor not found or update failed",
      };
    } else {
      // Insert new instructor
      const query = `
          INSERT INTO intructors 
          (first_name, last_name, email, phone_no, join_date, course_id, created_by, created_at, is_deleted) 
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
        `;

      const [result] = await sequelize.query(query, {
        replacements: [
          first_name,
          last_name,
          email,
          phone_no,
          join_date,
          course_id,
          created_by,
          "active",
        ],
      });

      return {
        status: true,
        message: "Instructor created successfully",
        instructorId: result.insertId,
      };
    }
  } catch (err) {
    console.error("Database Error:", err);
    return { status: false, errors: ["Database Insert/Update Failed"] };
  }
};

exports.getInstructorViewById = async (id) => {
  id = Number(id);
  console.log("Fetching Instructor ID:", id);

  const query = `
    SELECT 
      -- Instructor Information
      i.id, 
      CONCAT(i.first_name, ' ', i.last_name) AS instructor_name,
      i.phone_no, 
      i.email, 
      i.join_date,

      -- Batch Information
      b.id AS batch_id,
      b.batch_name,
      b.start_date AS batch_start_date,
      b.end_date AS batch_end_date,
      b.start_time,
      b.end_time,

      -- Course Information
      c.id AS course_id,
      c.course_name,
      c.description AS course_description,
      c.course_fee,
      c.start_date AS course_start_date,
      c.end_date AS course_end_date

    FROM intructors i

    -- Batch Details
    LEFT JOIN batches b ON i.id = b.instructor_id

    -- Course Details
    LEFT JOIN courses c ON b.courses_id = c.id

    WHERE i.id = ? AND LOWER(i.is_deleted) = 'active'
  `;

  const [instructorDetails] = await sequelize.query(query, { 
      replacements: [id], 
      type: sequelize.QueryTypes.SELECT 
  });

  console.log("Fetched Instructor Details:", instructorDetails);
  return instructorDetails;
};

exports.updateInstructorStatus = async (data) => {
  const { id, status } = data;

  try {
    // Define valid statuses
    const validStatuses = [
      "Active",
      "Inactive",
      "On_Leave",
      "Suspended",
      "Probation",
      "Part_Time",
      "Resigned",
      "Terminated",
      "Contract_Pending",
      "External",
    ];

    if (!validStatuses.includes(status)) {
      return { status: false, message: "Invalid status provided" };
    }

    // Update instructor status
    const query = `
            UPDATE intructors 
            SET status = ?, modified_at = NOW() 
            WHERE id = ?
        `;

    const [result] = await sequelize.query(query, {
      replacements: [status, id],
    });

    return {
      status: result.affectedRows > 0,
      message:
        result.affectedRows > 0
          ? "Instructor status updated successfully"
          : "Instructor not found or update failed",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { status: false, errors: ["Database Update Failed"] };
  }
};
