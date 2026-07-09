const invitationService = require("../services/invitation.service");

const sendInvite = async (req, res) => {
  try {
    const result = await invitationService.sendInvite(
      req.params.weddingId,
      req.body.email,
      req.user.id
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPendingInvites = async (req, res) => {
  try {
    const invites = await invitationService.getPendingInvites(req.user.email);
    res.json({ success: true, data: invites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptInvite = async (req, res) => {
  try {
    const result = await invitationService.acceptInvite(req.params.id, req.user.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const declineInvite = async (req, res) => {
  try {
    await invitationService.declineInvite(req.params.id, req.user.id);
    res.json({ success: true, message: "Invitation declined" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getInvitationsByWedding = async (req, res) => {
  try {
    const invites = await invitationService.getInvitationsByWedding(
      req.params.weddingId,
      req.user.id
    );
    res.json({ success: true, data: invites });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendInvite,
  getPendingInvites,
  acceptInvite,
  declineInvite,
  getInvitationsByWedding
};
