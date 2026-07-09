const checklistService = require("../services/checklist.service");

const createChecklist = async (req, res) => {
  try {
    const result = await checklistService.createChecklist(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getChecklists = async (req, res) => {
  try {
    const checklists = await checklistService.getChecklistsByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: checklists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getChecklistById = async (req, res) => {
  try {
    const checklist = await checklistService.getChecklistById(req.params.id, req.user.id);
    res.json({ success: true, data: checklist });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateChecklist = async (req, res) => {
  try {
    const updatedChecklist = await checklistService.updateChecklist(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedChecklist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteChecklist = async (req, res) => {
  try {
    await checklistService.deleteChecklist(req.params.id, req.user.id);
    res.json({ success: true, message: "Checklist item deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createChecklist,
  getChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist
};