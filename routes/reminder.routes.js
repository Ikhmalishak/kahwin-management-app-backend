const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { reminderSchema } = require("../validators/reminder.validator");

router.post("/", authenticate, validate(reminderSchema), reminderController.createReminder);
router.get("/", authenticate, reminderController.getReminders);
router.put("/:id", authenticate, validate(reminderSchema), reminderController.updateReminder);
router.delete("/:id", authenticate, reminderController.deleteReminder);

module.exports = router;