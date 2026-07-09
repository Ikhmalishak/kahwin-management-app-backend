const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const expenseRepository = require("../repositories/expense.repository");

const createExpense = async (userId, expenseData) => {
  await verifyWeddingOwnership(userId, expenseData.wedding_id);
  return expenseRepository.createExpense(expenseData);
};

const getExpensesByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return expenseRepository.findExpensesByWedding(weddingId);
};

const updateExpense = async (expenseId, updates, userId) => {
  await verifyExpenseOwnership(userId, expenseId);

  const allowedUpdates = {
    category: updates.category,
    amount: updates.amount,
    expense_date: updates.expense_date,
    notes: updates.notes
  };

  const cleanUpdates = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([_, v]) => v !== undefined)
  );

  return expenseRepository.updateExpense(expenseId, cleanUpdates);
};

const deleteExpense = async (expenseId, userId) => {
  await verifyExpenseOwnership(userId, expenseId);
  return expenseRepository.deleteExpense(expenseId);
};

const verifyExpenseOwnership = async (userId, expenseId) => {
  const expense = await expenseRepository.findExpenseById(expenseId);
  await verifyWeddingOwnership(userId, expense.wedding_id);
};

module.exports = {
  createExpense,
  getExpensesByWedding,
  updateExpense,
  deleteExpense
};
