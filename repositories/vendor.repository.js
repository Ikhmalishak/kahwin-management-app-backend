const pool = require("../config/db");

const createVendor = async (vendorData) => {
  const result = await pool.query(
    `INSERT INTO vendors (wedding_id, name, service, phone, email)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, service, phone, email, created_at`,
    [
      vendorData.wedding_id,
      vendorData.name,
      vendorData.service,
      vendorData.phone || null,
      vendorData.email || null
    ]
  );
  return result.rows[0];
};

const findVendorsByWedding = async (weddingId) => {
  const result = await pool.query(
    `SELECT * FROM vendors WHERE wedding_id = $1 AND deleted_at IS NULL`,
    [weddingId]
  );
  return result.rows;
};

const findVendorById = async (vendorId) => {
  const result = await pool.query(
    `SELECT * FROM vendors WHERE id = $1 AND deleted_at IS NULL`,
    [vendorId]
  );
  if (!result.rows[0]) throw new Error("Vendor not found");
  return result.rows[0];
};

const updateVendor = async (vendorId, updates) => {
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

  values.push(vendorId);
  const query = `
    UPDATE vendors
    SET ${setClauses.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteVendor = async (vendorId) => {
  await pool.query(
    "UPDATE vendors SET deleted_at = NOW() WHERE id = $1",
    [vendorId]
  );
};

module.exports = {
  createVendor,
  findVendorsByWedding,
  findVendorById,
  updateVendor,
  deleteVendor
};
