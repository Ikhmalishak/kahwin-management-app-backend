const guestService = require("../services/guest.service");

const createGuest = async (req, res) => {
  try {
    const result = await guestService.createGuest(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await guestService.getGuestsByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: guests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getGuestById = async (req, res) => {
  try {
    const guest = await guestService.getGuestById(req.params.id, req.user.id);
    res.json({ success: true, data: guest });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateGuest = async (req, res) => {
  try {
    const updatedGuest = await guestService.updateGuest(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedGuest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteGuest = async (req, res) => {
  try {
    await guestService.deleteGuest(req.params.id, req.user.id);
    res.json({ success: true, message: "Guest deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest
};