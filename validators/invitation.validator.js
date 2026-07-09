const { z } = require("zod");

const inviteSchema = z.object({
  email: z.string().email()
});

module.exports = {
  inviteSchema
};
