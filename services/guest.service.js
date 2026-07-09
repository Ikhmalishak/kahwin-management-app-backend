const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const guestRepository = require("../repositories/guest.repository");

const createGuest = async (userId, guestData) => {
  await verifyWeddingOwnership(userId, guestData.wedding_id);
  return guestRepository.createGuest(guestData);
};

const getGuestsByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return guestRepository.findGuestsByWedding(weddingId);
};

const getGuestById = async (guestId, userId) => {
  const guest = await guestRepository.findGuestById(guestId);
  await verifyWeddingOwnership(userId, guest.wedding_id);
  return guest;
};

const updateGuest = async (guestId, updates, userId) => {
  const existingGuest = await getGuestById(guestId, userId);

  const allowedUpdates = {
    name: updates.name,
    phone: updates.phone,
    status: updates.status,
    table_no: updates.table_no
  };

  const cleanUpdates = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([_, v]) => v !== undefined)
  );

  return guestRepository.updateGuest(guestId, {
    ...existingGuest,
    ...cleanUpdates
  });
};

const deleteGuest = async (guestId, userId) => {
  await getGuestById(guestId, userId);
  return guestRepository.deleteGuest(guestId);
};

module.exports = {
  createGuest,
  getGuestsByWedding,
  getGuestById,
  updateGuest,
  deleteGuest
};
