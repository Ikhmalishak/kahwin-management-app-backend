const pool = require("../config/db");

const createExpense = async (expenseData) => {
  const result = await pool.query(
    `INSERT INTO expenses (wedding_id, category, amount, expense_date, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, category, amount, expense_date, notes, created_at`,
    [
      expenseData.wedding_id,
      expenseData.category,
      expenseData.amount,
      expenseData.expense_date,
      expenseData.notes || null
    ]
  );
  return result.rows[0];
};

const findExpensesByWedding = async (weddingId) => {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE wedding_id = $1 AND deleted_at IS NULL",
    [weddingId]
  );
  return result.rows;
};

const findExpenseById = async (expenseId) => {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE id = $1 AND deleted_at IS NULL",
    [expenseId]
  );
  if (!result.rows[0]) throw new Error("Expense not found");
  return result.rows[0];
};

const updateExpense = async (expenseId, updates) => {
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

  values.push(expenseId);
  const query = `
    UPDATE expenses
    SET ${setClauses.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteExpense = async (expenseId) => {
  await pool.query("UPDATE expenses SET deleted_at = NOW() WHERE id = $1", [expenseId]);
};

module.exports = {
  createExpense,
  findExpensesByWedding,
  findExpenseById,
  updateExpense,
  deleteExpense
};