const { z } = require("zod");

const paymentSchema = z.object({
  expense_id: z.number().int().positive(),
  amount: z.number().positive(),
  payment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "payment_date must be a valid date (YYYY-MM-DD or ISO)"),
  payment_method: z.string().min(2)
});

module.exports = {
  paymentSchema
};