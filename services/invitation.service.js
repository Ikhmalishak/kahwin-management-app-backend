const { verifyOwnerOnly } = require("../utils/wedding-ownership");
const invitationRepository = require("../repositories/invitation.repository");

const sendInvite = async (weddingId, email, userId) => {
  await verifyOwnerOnly(userId, weddingId);
  return invitationRepository.createInvitation(weddingId, email, userId);
};

const getPendingInvites = async (email) => {
  return invitationRepository.findPendingByEmail(email);
};

const acceptInvite = async (invitationId, userId) => {
  const invitation = await invitationRepository.findById(invitationId);

  const userEmail = await getUserEmail(userId);
  if (invitation.email !== userEmail) {
    throw new Error("This invitation was not sent to you");
  }
  if (invitation.status !== "pending") {
    throw new Error("Invitation is no longer pending");
  }

  await invitationRepository.addCollaborator(invitation.wedding_id, userId);
  await invitationRepository.acceptInvitation(invitationId);

  return { wedding_id: invitation.wedding_id };
};

const declineInvite = async (invitationId, userId) => {
  const invitation = await invitationRepository.findById(invitationId);

  const userEmail = await getUserEmail(userId);
  if (invitation.email !== userEmail) {
    throw new Error("This invitation was not sent to you");
  }
  if (invitation.status !== "pending") {
    throw new Error("Invitation is no longer pending");
  }

  await invitationRepository.declineInvitation(invitationId);
};

const getInvitationsByWedding = async (weddingId, userId) => {
  await verifyOwnerOnly(userId, weddingId);
  return invitationRepository.findInvitationsByWedding(weddingId);
};

const getUserEmail = async (userId) => {
  const pool = require("../config/db");
  const result = await pool.query("SELECT email FROM users WHERE id = $1", [userId]);
  return result.rows[0]?.email;
};

module.exports = {
  sendInvite,
  getPendingInvites,
  acceptInvite,
  declineInvite,
  getInvitationsByWedding
};
