const { z } = require("zod");

const documentSchema = z.object({
  wedding_id: z.number().int().positive(),
  name: z.string().min(2),
  file_url: z.string().url(),
  status: z.enum(['Pending', 'Submitted', 'Approved']).default('Pending')
});

module.exports = {
  documentSchema
};
