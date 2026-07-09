const express = require("express");
const router = express.Router();
const invitationController = require("../controllers/invitation.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.get("/", authenticate, invitationController.getPendingInvites);
router.post("/:id/accept", authenticate, invitationController.acceptInvite);
router.post("/:id/decline", authenticate, invitationController.declineInvite);

module.exports = router;
