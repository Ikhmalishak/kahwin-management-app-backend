const pool = require("../config/db");

const createGuest = async (guestData) => {
  const result = await pool.query(
    `INSERT INTO guests (wedding_id, name, phone, status, table_no)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, phone, status, table_no, created_at`,
    [
      guestData.wedding_id,
      guestData.name,
      guestData.phone || null,
      guestData.status || 'Pending',
      guestData.table_no || null
    ]
  );
  return result.rows[0];
};

const findGuestsByWedding = async (weddingId) => {
  const result = await pool.query(
    `SELECT * FROM guests WHERE wedding_id = $1 AND deleted_at IS NULL`,
    [weddingId]
  );
  return result.rows;
};

const findGuestById = async (guestId) => {
  const result = await pool.query(
    `SELECT * FROM guests WHERE id = $1 AND deleted_at IS NULL`,
    [guestId]
  );
  if (!result.rows[0]) throw new Error("Guest not found");
  return result.rows[0];
};

const updateGuest = async (guestId, updates) => {
  const setClauses = [];
  const values = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramCount}`);
    values.push(value);
    paramCount++;
  }

  if (setClauses.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  values.push(guestId);
  const query = `
    UPDATE guests
    SET ${setClauses.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteGuest = async (guestId) => {
  await pool.query(
    "UPDATE guests SET deleted_at = NOW() WHERE id = $1",
    [guestId]
  );
};

module.exports = {
  createGuest,
  findGuestsByWedding,
  findGuestById,
  updateGuest,
  deleteGuest
};
