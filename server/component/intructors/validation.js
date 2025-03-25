const Joi = require("joi");

exports.validateInstructor = (data) => {
    const schema = Joi.object({
        id: Joi.number() // Optional for insert, required for update
            .integer()
            .positive()
            .optional(),

        first_name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .max(255)
            .required()
            .messages({
                "string.pattern.base": "First name should contain only alphabets.",
            }),

        last_name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .max(255)
            .required()
            .messages({
                "string.pattern.base": "Last name should contain only alphabets.",
            }),

        email: Joi.string()
            .email()
            .max(255)
            .required(),

        phone_no: Joi.string()
            .pattern(/^\+?[1-9]\d{1,14}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be in a valid international format (e.g., +91XXXXXXXXXX).",
            }),

        join_date: Joi.date()
            .max("now")
            .required()
            .messages({
                "date.max": "Join date cannot be in the future.",
            }),

        course_id: Joi.number()
            .integer()
            .positive()
            .required(),

        created_by: Joi.number()
            .integer()
            .positive()
            .required(),

        modified_by: Joi.number()
            .integer()
            .positive()
            .optional(),

        is_deleted: Joi.string()
            .valid("active", "inactive")
            .default("active")
            .optional(),

        status: Joi.string()
            .valid(
                "Active", "Inactive", "On_Leave", "Suspended", "Probation",
                "Part_Time", "Resigned", "Terminated", "Contract_Pending", "External"
            )
            .default("Active")
            .optional(),
    });

    return schema.validate(data);
};
