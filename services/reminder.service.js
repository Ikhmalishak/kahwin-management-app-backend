const { verifyWeddingOwnership } = require("../utils/wedding-ownership");
const reminderRepository = require("../repositories/reminder.repository");

const createReminder = async (userId, reminderData) => {
  await verifyWeddingOwnership(userId, reminderData.wedding_id);
  return reminderRepository.createReminder(reminderData);
};

const getRemindersByWedding = async (userId, weddingId) => {
  await verifyWeddingOwnership(userId, weddingId);
  return reminderRepository.findRemindersByWedding(weddingId);
};

const updateReminder = async (reminderId, updates, userId) => {
  await verifyReminderOwnership(userId, reminderId);

  const allowedUpdates = {
    title: updates.title,
    due_date: updates.due_date,
    status: updates.status
  };

  const cleanUpdates = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([_, v]) => v !== undefined)
  );

  return reminderRepository.updateReminder(reminderId, cleanUpdates);
};

const deleteReminder = async (reminderId, userId) => {
  await verifyReminderOwnership(userId, reminderId);
  return reminderRepository.deleteReminder(reminderId);
};

const verifyReminderOwnership = async (userId, reminderId) => {
  const reminder = await reminderRepository.findReminderById(reminderId);
  await verifyWeddingOwnership(userId, reminder.wedding_id);
};

module.exports = {
  createReminder,
  getRemindersByWedding,
  updateReminder,
  deleteReminder
};
