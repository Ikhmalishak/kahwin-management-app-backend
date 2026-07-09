const pool = require("../config/db");

const createInvitation = async (weddingId, email, invitedBy) => {
  const result = await pool.query(
    `INSERT INTO wedding_invitations (wedding_id, email, invited_by)
     VALUES ($1, $2, $3)
     RETURNING id, wedding_id, email, status, created_at`,
    [weddingId, email, invitedBy]
  );
  return result.rows[0];
};

const findPendingByEmail = async (email) => {
  const result = await pool.query(
    `SELECT wi.*, w.partner_name
     FROM wedding_invitations wi
     JOIN weddings w ON w.id = wi.wedding_id
     WHERE wi.email = $1 AND wi.status = 'pending'`,
    [email]
  );
  return result.rows;
};

const findById = async (invitationId) => {
  const result = await pool.query(
    "SELECT * FROM wedding_invitations WHERE id = $1",
    [invitationId]
  );
  if (!result.rows[0]) throw new Error("Invitation not found");
  return result.rows[0];
};

const findInvitationsByWedding = async (weddingId) => {
  const result = await pool.query(
    `SELECT * FROM wedding_invitations WHERE wedding_id = $1 ORDER BY created_at DESC`,
    [weddingId]
  );
  return result.rows;
};

const acceptInvitation = async (invitationId) => {
  await pool.query(
    "UPDATE wedding_invitations SET status = 'accepted', updated_at = NOW() WHERE id = $1",
    [invitationId]
  );
};

const declineInvitation = async (invitationId) => {
  await pool.query(
    "UPDATE wedding_invitations SET status = 'declined', updated_at = NOW() WHERE id = $1",
    [invitationId]
  );
};

const addCollaborator = async (weddingId, userId) => {
  await pool.query(
    `INSERT INTO wedding_collaborators (wedding_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT (wedding_id, user_id) DO NOTHING`,
    [weddingId, userId]
  );
};

module.exports = {
  createInvitation,
  findPendingByEmail,
  findById,
  findInvitationsByWedding,
  acceptInvitation,
  declineInvitation,
  addCollaborator
};
