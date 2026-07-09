const pool = require("../config/db");

const createChecklist = async (checklistData) => {
  const result = await pool.query(
    `INSERT INTO checklist (wedding_id, title, category, due_date, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, category, status, due_date, created_at`,
    [
      checklistData.wedding_id,
      checklistData.title,
      checklistData.category,
      checklistData.due_date,
      checklistData.status
    ]
  );
  return result.rows[0];
};

const findChecklistsByWedding = async (weddingId) => {
  const result = await pool.query(
    `SELECT c.* FROM checklist c
     JOIN weddings w ON w.id = c.wedding_id
     WHERE c.wedding_id = $1 AND c.deleted_at IS NULL`,
    [weddingId]
  );
  return result.rows;
};

const findChecklistById = async (checklistId) => {
  const result = await pool.query(
    `SELECT c.* FROM checklist c
     WHERE c.id = $1 AND c.deleted_at IS NULL`,
    [checklistId]
  );
  if (!result.rows[0]) throw new Error("Checklist item not found");
  return result.rows[0];
};

const updateChecklist = async (checklistId, updates) => {
  const setClauses = [];
  const values = [];
  let paramCount = 1;

  // Dynamically build SET clauses
  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramCount}`);
    values.push(value);
    paramCount++;
  }

  if (setClauses.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  values.push(checklistId);
  const query = `
    UPDATE checklist
    SET ${setClauses.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteChecklist = async (checklistId) => {
  await pool.query(
    "UPDATE checklist SET deleted_at = NOW() WHERE id = $1",
    [checklistId]
  );
};

module.exports = {
  createChecklist,
  findChecklistsByWedding,
  findChecklistById,
  updateChecklist,
  deleteChecklist
};