const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { expenseSchema } = require("../validators/expense.validator");

router.post("/", authenticate, validate(expenseSchema), expenseController.createExpense);
router.get("/", authenticate, expenseController.getExpenses);
router.put("/:id", authenticate, validate(expenseSchema), expenseController.updateExpense);
router.delete("/:id", authenticate, expenseController.deleteExpense);

module.exports = router;