const pool = require("../config/db");

const createReminder = async (reminderData) => {
  const result = await pool.query(
      `INSERT INTO reminders (wedding_id, title, due_date)
     VALUES ($1, $2, $3)
     RETURNING id, title, due_date, status`,
    [
      reminderData.wedding_id,
      reminderData.title,
      reminderData.due_date
    ]
  );
  return result.rows[0];
};

const findRemindersByWedding = async (weddingId) => {
  const result = await pool.query(
    "SELECT * FROM reminders WHERE wedding_id = $1 AND deleted_at IS NULL",
    [weddingId]
  );
  return result.rows;
};

const findReminderById = async (reminderId) => {
  const result = await pool.query(
    "SELECT * FROM reminders WHERE id = $1 AND deleted_at IS NULL",
    [reminderId]
  );
  if (!result.rows[0]) throw new Error("Reminder not found");
  return result.rows[0];
};

const updateReminder = async (reminderId, updates) => {
  const setClauses = [];
  const values = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramCount}`);
    values.push(value);
    paramCount++;
  }

  if (setClauses.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  values.push(reminderId);
  const query = `
    UPDATE reminders
    SET ${setClauses.join(', ')}
    WHERE id = $${paramCount} AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteReminder = async (reminderId) => {
  await pool.query("UPDATE reminders SET deleted_at = NOW() WHERE id = $1", [reminderId]);
};

module.exports = {
  createReminder,
  findRemindersByWedding,
  findReminderById,
  updateReminder,
  deleteReminder
};