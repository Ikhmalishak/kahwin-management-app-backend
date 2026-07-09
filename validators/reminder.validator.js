const { z } = require("zod");

const reminderSchema = z.object({
  wedding_id: z.number().int().positive(),
  title: z.string().min(3),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "due_date must be a valid date (YYYY-MM-DD or ISO)"),
  status: z.enum(['Pending', 'Completed']).default('Pending')
});

module.exports = {
  reminderSchema
};