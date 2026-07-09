const pool = require("../config/db");

const checkCollaboratorsTable = async () => {
  const result = await pool.query(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = 'wedding_collaborators'
    )`
  );
  return result.rows[0].exists;
};

let hasCollaboratorsTable = null;

const verifyWeddingOwnership = async (userId, weddingId) => {
  if (hasCollaboratorsTable === null) {
    hasCollaboratorsTable = await checkCollaboratorsTable();
  }

  if (hasCollaboratorsTable) {
    const result = await pool.query(
      `SELECT id FROM weddings
       WHERE id = $1 AND deleted_at IS NULL
         AND (user_id = $2 OR EXISTS (
           SELECT 1 FROM wedding_collaborators
           WHERE wedding_id = weddings.id AND user_id = $2
         ))`,
      [weddingId, userId]
    );
    if (result.rows[0]) return;
  } else {
    const result = await pool.query(
      "SELECT id FROM weddings WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL",
      [weddingId, userId]
    );
    if (result.rows[0]) return;
  }

  throw new Error("Wedding not found or access denied");
};

const verifyOwnerOnly = async (userId, weddingId) => {
  const result = await pool.query(
    "SELECT id FROM weddings WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL",
    [weddingId, userId]
  );
  if (!result.rows[0]) {
    throw new Error("Only the wedding owner can perform this action");
  }
};

module.exports = { verifyWeddingOwnership, verifyOwnerOnly };
