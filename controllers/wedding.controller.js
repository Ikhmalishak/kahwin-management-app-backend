const weddingService = require("../services/wedding.service");

const createWedding = async (req, res) => {
  try {
    const result = await weddingService.createWedding(req.user.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getWeddings = async (req, res) => {
  try {
    const weddings = await weddingService.getWeddingsByUser(req.user.id);
    res.json({ success: true, data: weddings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWeddingById = async (req, res) => {
  try {
    const wedding = await weddingService.getWeddingById(req.params.id, req.user.id);
    res.json({ success: true, data: wedding });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateWedding = async (req, res) => {
  try {
    const updatedWedding = await weddingService.updateWedding(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedWedding });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteWedding = async (req, res) => {
  try {
    await weddingService.deleteWedding(req.params.id, req.user.id);
    res.json({ success: true, message: "Wedding deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createWedding,
  getWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding
};