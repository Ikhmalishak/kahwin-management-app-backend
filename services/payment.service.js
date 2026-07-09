const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const paymentRepository = require("../repositories/payment.repository");

const getPaymentsByExpense = async (userId, expenseId) => {
  await verifyExpenseOwnership(userId, expenseId);
  return paymentRepository.findPaymentsByExpense(expenseId);
};

const getPaymentById = async (paymentId, userId) => {
  const payment = await paymentRepository.findPaymentById(paymentId);
  await verifyPaymentOwnership(userId, paymentId);
  return payment;
};

const createPayment = async (userId, paymentData) => {
  await verifyExpenseOwnership(userId, paymentData.expense_id);
  return paymentRepository.createPayment(paymentData);
};

const updatePayment = async (paymentId, updates, userId) => {
  await verifyPaymentOwnership(userId, paymentId);
  return paymentRepository.updatePayment(paymentId, updates);
};

const deletePayment = async (paymentId, userId) => {
  await verifyPaymentOwnership(userId, paymentId);
  return paymentRepository.deletePayment(paymentId);
};

const verifyExpenseOwnership = async (userId, expenseId) => {
  const result = await paymentRepository.findExpenseWeddingId(expenseId);
  await verifyWeddingOwnership(userId, result.wedding_id);
};

const verifyPaymentOwnership = async (userId, paymentId) => {
  const payment = await paymentRepository.findPaymentById(paymentId);
  const result = await paymentRepository.findExpenseWeddingId(payment.expense_id);
  await verifyWeddingOwnership(userId, result.wedding_id);
};

module.exports = {
  getPaymentsByExpense,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
