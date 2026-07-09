const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklist.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { createChecklistSchema, updateChecklistSchema } = require("../validators/checklist.validator");

router.post("/", authenticate, validate(createChecklistSchema), checklistController.createChecklist);
router.get("/", authenticate, checklistController.getChecklists);
router.get("/:id", authenticate, checklistController.getChecklistById);
router.put("/:id", authenticate, validate(updateChecklistSchema), checklistController.updateChecklist);
router.delete("/:id", authenticate, checklistController.deleteChecklist);

module.exports = router;