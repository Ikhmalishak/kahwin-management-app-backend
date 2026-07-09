const expenseService = require("../services/expense.service");

const createExpense = async (req, res) => {
  try {
    const result = await expenseService.createExpense(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getExpensesByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await expenseService.updateExpense(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedExpense });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await expenseService.deleteExpense(req.params.id, req.user.id);
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};