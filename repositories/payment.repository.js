const pool = require("../config/db");

const createPayment = async (paymentData) => {
  const result = await pool.query(
    `INSERT INTO payments (expense_id, amount, payment_date, payment_method)
     VALUES ($1, $2, $3, $4)
     RETURNING id, amount, payment_date, payment_method`,
    [
      paymentData.expense_id,
      paymentData.amount,
      paymentData.payment_date,
      paymentData.payment_method
    ]
  );
  return result.rows[0];
};

const findPaymentsByExpense = async (expenseId) => {
  const result = await pool.query(
    "SELECT * FROM payments WHERE expense_id = $1 AND deleted_at IS NULL",
    [expenseId]
  );
  return result.rows;
};

const findPaymentById = async (paymentId) => {
  const result = await pool.query(
    "SELECT * FROM payments WHERE id = $1 AND deleted_at IS NULL",
    [paymentId]
  );
  if (!result.rows[0]) throw new Error("Payment not found");
  return result.rows[0];
};

const updatePayment = async (paymentId, updates) => {
  const result = await pool.query(
    `UPDATE payments
     SET amount = $1, payment_date = $2, payment_method = $3
     WHERE id = $4 AND deleted_at IS NULL
     RETURNING *`,
    [
      updates.amount,
      updates.payment_date,
      updates.payment_method,
      paymentId
    ]
  );
  return result.rows[0];
};

const findExpenseWeddingId = async (expenseId) => {
  const result = await pool.query(
    "SELECT wedding_id FROM expenses WHERE id = $1",
    [expenseId]
  );
  if (!result.rows[0]) throw new Error("Expense not found");
  return result.rows[0];
};

const deletePayment = async (paymentId) => {
  await pool.query("UPDATE payments SET deleted_at = NOW() WHERE id = $1", [paymentId]);
};

module.exports = {
  createPayment,
  findPaymentsByExpense,
  findPaymentById,
  updatePayment,
deletePayment,
  findExpenseWeddingId
};