const { z } = require("zod");

const guestSchema = z.object({
  wedding_id: z.number().int().positive(),
  name: z.string().min(2),
  phone: z.string().optional(),
  status: z.enum(['Pending', 'Confirmed', 'Declined']).default('Pending'),
  table_no: z.number().int().positive().optional()
});

module.exports = {
  guestSchema
};
