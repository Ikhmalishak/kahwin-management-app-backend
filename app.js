const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./config/db');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const weddingRoutes = require('./routes/wedding.routes');
const checklistRoutes = require('./routes/checklist.routes');
const expenseRoutes = require('./routes/expense.routes');
const paymentRoutes = require('./routes/payment.routes');
const reminderRoutes = require('./routes/reminder.routes');
const guestRoutes = require('./routes/guest.routes');
const vendorRoutes = require('./routes/vendor.routes');
const documentRoutes = require('./routes/document.routes');
const invitationRoutes = require('./routes/invitation.routes');

app.use('/api/auth', authRoutes);
app.use('/api/reminders', require('./middlewares/auth.middleware').authenticate, reminderRoutes);
app.use('/api/weddings', require('./middlewares/auth.middleware').authenticate, weddingRoutes);
app.use('/api/checklists', require('./middlewares/auth.middleware').authenticate, checklistRoutes);
app.use('/api/expenses', require('./middlewares/auth.middleware').authenticate, expenseRoutes);
app.use('/api/payments', require('./middlewares/auth.middleware').authenticate, paymentRoutes);
app.use('/api/guests', require('./middlewares/auth.middleware').authenticate, guestRoutes);
app.use('/api/vendors', require('./middlewares/auth.middleware').authenticate, vendorRoutes);
app.use('/api/documents', require('./middlewares/auth.middleware').authenticate, documentRoutes);
app.use('/api/invitations', require('./middlewares/auth.middleware').authenticate, invitationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

//test database connection
pool.query("SELECT NOW()", (err, res) => {
    if(err){
        console.error("Database connection error:", err.stack);
    } else {
        console.log("Database connected successfully at ", res.rows[0].now);
    }
});

pool.query("SELECT current_user", (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Current DB User:", result.rows[0].current_user);
    }
});

// Export the Express app for testing
module.exports = app;

// Start the server only when not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
  });
}
