const { verifyWeddingOwnership, verifyOwnerOnly } = require("../utils/wedding-ownership");
const pool = require("../config/db");

const createWedding = async (userId, weddingData) => {
  const { partner_name, wedding_date, budget, location } = weddingData;
  const result = await pool.query(
    `INSERT INTO weddings (user_id, partner_name, wedding_date, budget, location)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, partner_name, wedding_date, budget, location, created_at`,
    [userId, partner_name, wedding_date, budget, location]
  );
  return result.rows[0];
};

const getWeddingsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT DISTINCT w.* FROM weddings w
     LEFT JOIN wedding_collaborators wc ON wc.wedding_id = w.id
     WHERE w.deleted_at IS NULL
       AND (w.user_id = $1 OR wc.user_id = $1)`,
    [userId]
  );
  return result.rows;
};

const getWeddingById = async (weddingId, userId) => {
  await verifyWeddingOwnership(userId, weddingId);
  const result = await pool.query(
    "SELECT * FROM weddings WHERE id = $1 AND deleted_at IS NULL",
    [weddingId]
  );
  if (!result.rows[0]) throw new Error("Wedding not found");
  return result.rows[0];
};

const updateWedding = async (weddingId, updates, userId) => {
  await verifyOwnerOnly(userId, weddingId);
  const { partner_name, wedding_date, budget, location } = updates;
  const result = await pool.query(
    `UPDATE weddings
     SET partner_name = $1, wedding_date = $2, budget = $3, location = $4
     WHERE id = $5 AND user_id = $6 AND deleted_at IS NULL
     RETURNING *`,
    [partner_name, wedding_date, budget, location, weddingId, userId]
  );
  if (!result.rows[0]) throw new Error("Wedding not found");
  return result.rows[0];
};

const deleteWedding = async (weddingId, userId) => {
  await verifyOwnerOnly(userId, weddingId);
  const result = await pool.query(
    "UPDATE weddings SET deleted_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING id",
    [weddingId, userId]
  );
  if (!result.rows[0]) throw new Error("Wedding not found");
};

module.exports = {
  createWedding,
  getWeddingsByUser,
  getWeddingById,
  updateWedding,
  deleteWedding
};
