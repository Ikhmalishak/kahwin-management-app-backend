const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { documentSchema } = require("../validators/document.validator");

router.post("/", authenticate, validate(documentSchema), documentController.createDocument);
router.get("/", authenticate, documentController.getDocuments);
router.get("/:id", authenticate, documentController.getDocumentById);
router.delete("/:id", authenticate, documentController.deleteDocument);

module.exports = router;