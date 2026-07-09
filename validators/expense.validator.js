const { z } = require("zod");

const expenseSchema = z.object({
  wedding_id: z.number().int().positive(),
  category: z.string().min(2),
  amount: z.number().positive(),
  expense_date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "expense_date must be a valid date (YYYY-MM-DD or ISO)"),
  notes: z.string().optional()
});

module.exports = {
  expenseSchema
};