const { z } = require("zod");

const vendorSchema = z.object({
  wedding_id: z.number().int().positive(),
  name: z.string().min(2),
  service: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional()
});

module.exports = {
  vendorSchema
};
