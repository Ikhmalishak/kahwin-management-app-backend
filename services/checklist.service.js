const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const checklistRepository = require("../repositories/checklist.repository");

const createChecklist = async (userId, checklistData) => {
  const { wedding_id, title, category, due_date, status = 'Pending' } = checklistData;
  
  await verifyWeddingOwnership(userId, wedding_id);
  
  return checklistRepository.createChecklist({
    wedding_id,
    title,
    category,
    due_date,
    status
  });
};

const getChecklistsByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return checklistRepository.findChecklistsByWedding(weddingId);
};

const getChecklistById = async (checklistId, userId) => {
  const checklist = await checklistRepository.findChecklistById(checklistId);
  await verifyWeddingOwnership(userId, checklist.wedding_id);
  return checklist;
};

const updateChecklist = async (checklistId, updates, userId) => {
  const existingChecklist = await getChecklistById(checklistId, userId);
  
  // Only allow specific fields to be updated
  const allowedUpdates = {
    title: updates.title,
    category: updates.category,
    due_date: updates.due_date,
    status: updates.status
  };

  // Filter out undefined values
  const cleanUpdates = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([_, v]) => v !== undefined)
  );

  return checklistRepository.updateChecklist(checklistId, {
    ...existingChecklist,
    ...cleanUpdates
  });
};

const deleteChecklist = async (checklistId, userId) => {
  await getChecklistById(checklistId, userId);
  return checklistRepository.deleteChecklist(checklistId);
};

module.exports = {
  createChecklist,
  getChecklistsByWedding,
  getChecklistById,
  updateChecklist,
  deleteChecklist
};