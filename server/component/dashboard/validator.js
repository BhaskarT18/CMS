const Joi = require('joi');

const dashboardSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title cannot exceed 100 characters',
  }),

  description: Joi.string().min(10).max(500).optional().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 500 characters',
  }),

  status: Joi.string().valid('active', 'inactive').default('active').messages({
    'any.only': 'Status must be either active or inactive',
  }),

  created_at: Joi.date().default(() => new Date(), 'current date'),
});

module.exports = dashboardSchema;

