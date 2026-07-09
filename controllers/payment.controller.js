const paymentService = require("../services/payment.service");

const getPayments = async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByExpense(req.user.id, req.query.expenseId);
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id, req.user.id);
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await paymentService.updatePayment(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedPayment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    await paymentService.deletePayment(req.params.id, req.user.id);
    res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};