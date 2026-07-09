const express = require("express");
const router = express.Router();
const weddingController = require("../controllers/wedding.controller");
const invitationController = require("../controllers/invitation.controller");
const { authorize } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { inviteSchema } = require("../validators/invitation.validator");

router.post("/", weddingController.createWedding);
router.get("/", weddingController.getWeddings);
router.get("/:id", weddingController.getWeddingById);
router.put("/:id", authorize(['admin']), weddingController.updateWedding);
router.delete("/:id", authorize(['admin']), weddingController.deleteWedding);
router.post("/:weddingId/invitations", validate(inviteSchema), invitationController.sendInvite);

module.exports = router;