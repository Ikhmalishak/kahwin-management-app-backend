const { z } = require("zod");

const createChecklistSchema = z.object({
  wedding_id: z.coerce.number().int().positive(),
  title: z.string().min(3),
  category: z.string().min(2),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "due_date must be a valid date (YYYY-MM-DD or ISO)").optional(),
  status: z.enum(['Pending', 'In Progress', 'Completed']).optional().default('Pending')
});

const updateChecklistSchema = z.object({
  title: z.string().min(3).optional(),
  category: z.string().min(2).optional(),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "due_date must be a valid date (YYYY-MM-DD or ISO)").optional(),
  status: z.enum(['Pending', 'In Progress', 'Completed']).optional()
});

module.exports = {
  createChecklistSchema,
  updateChecklistSchema
};
