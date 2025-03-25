const Joi = require("joi");

exports.validateCourse = (data) => {
    const schema = Joi.object({
        id: Joi.number()
            .integer()
            .positive()
            .optional(), // Auto-incremented ID, not required for insert

        course_name: Joi.string()
            .max(255)
            .required(),

        description: Joi.string()
            .max(5000) // Assuming a reasonable max length for text
            .optional(),

        course_fee: Joi.number()
            .precision(2) // Ensures two decimal places
            .positive()
            .required(),

        start_date: Joi.date()
            .required(),

        end_date: Joi.date()
            .greater(Joi.ref("start_date")) // Ensures end date is after start date
            .required()
            .messages({
                "date.greater": "End date must be after the start date.",
            }),

        created_at: Joi.date()
            .default(() => new Date(), "current timestamp")
            .optional(),

        modified_at: Joi.date()
            .optional(),

        created_by: Joi.number()
            .integer()
            .positive()
            .required(),

        modified_by: Joi.number()
            .integer()
            .positive()
            .optional(),

        deleted_on: Joi.date()
            .optional()
            .allow(null),

        is_deleted: Joi.string()
            .valid("active", "inactive")
            .default("active")
            .required(),
    });

    return schema.validate(data);
};
