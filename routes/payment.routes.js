const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { paymentSchema } = require("../validators/payment.validator");

router.get("/", authenticate, paymentController.getPayments);
router.get("/:id", authenticate, paymentController.getPaymentById);
router.post("/", authenticate, validate(paymentSchema), paymentController.createPayment);
router.put("/:id", authenticate, validate(paymentSchema), paymentController.updatePayment);
router.delete("/:id", authenticate, paymentController.deletePayment);

module.exports = router;