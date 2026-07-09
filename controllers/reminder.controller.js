const reminderService = require("../services/reminder.service");

const createReminder = async (req, res) => {
  try {
    const result = await reminderService.createReminder(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await reminderService.getRemindersByWedding(req.user.id, req.query.weddingId);
    res.json({ success: true, data: reminders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const updatedReminder = await reminderService.updateReminder(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json({ success: true, data: updatedReminder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    await reminderService.deleteReminder(req.params.id, req.user.id);
    res.json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder
};