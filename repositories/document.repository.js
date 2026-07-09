const pool = require("../config/db");

const createDocument = async (documentData) => {
  const result = await pool.query(
    `INSERT INTO documents (wedding_id, name, file_url, status)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, file_url, status, created_at`,
    [
      documentData.wedding_id,
      documentData.name,
      documentData.file_url,
      documentData.status || 'Pending'
    ]
  );
  return result.rows[0];
};

const findDocumentsByWedding = async (weddingId) => {
  const result = await pool.query(
    `SELECT * FROM documents WHERE wedding_id = $1 AND deleted_at IS NULL`,
    [weddingId]
  );
  return result.rows;
};

const findDocumentById = async (documentId) => {
  const result = await pool.query(
    `SELECT * FROM documents WHERE id = $1 AND deleted_at IS NULL`,
    [documentId]
  );
  if (!result.rows[0]) throw new Error("Document not found");
  return result.rows[0];
};

const deleteDocument = async (documentId) => {
  await pool.query(
    "UPDATE documents SET deleted_at = NOW() WHERE id = $1",
    [documentId]
  );
};

module.exports = {
  createDocument,
  findDocumentsByWedding,
  findDocumentById,
  deleteDocument
};
