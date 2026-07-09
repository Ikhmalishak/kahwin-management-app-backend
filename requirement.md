# Wedding Checklist Management System (WCMS)

## 1. Project Overview

Wedding Checklist Management System is a full-stack web application that helps couples manage their wedding preparation in one place.

The system allows users to:
- Track wedding preparation progress
- Manage checklist items
- Manage guests
- Manage vendors
- Track expenses and payments
- Store important documents
- Receive reminders for upcoming tasks

This project is intended as a portfolio project demonstrating a production-style Express.js backend with React frontend.

---

# 2. Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- JWT Authentication
- bcryptjs
- express-validator (or Zod)

---

# 3. User Roles

## User

Normal couple preparing their wedding.

Permissions:

- Manage own wedding
- Manage own checklist
- Manage guests
- Manage vendors
- Manage expenses
- Upload documents

---

## Admin

For future expansion.

Permissions:

- View all users
- Manage all data
- Dashboard statistics

---

# 4. Authentication

## Register

Fields

- name
- email
- password
- role

Requirements

- Email must be unique
- Password minimum 8 characters
- Password must be hashed using bcrypt

---

## Login

Fields

- email
- password

Requirements

- Verify password
- Generate JWT
- Return token

---

## Logout

- Client removes token

---

# 5. Database Tables

## users

- id
- name
- email
- password
- role
- created_at
- updated_at
- deleted_at

---

## weddings

- id
- user_id
- partner_name
- wedding_date
- venue
- budget
- created_at

---

## checklist

- id
- wedding_id
- category
- task
- status
- due_date

---

## guests

- id
- wedding_id
- name
- phone
- invitation_status
- attendance_status

---

## vendors

- id
- wedding_id
- category
- company_name
- contact_person
- phone
- email
- quotation

---

## expenses

- id
- wedding_id
- category
- description
- amount
- payment_status

---

## payments

- id
- expense_id
- amount
- payment_date
- payment_method

---

## documents

- id
- wedding_id
- file_name
- file_path
- document_type

---

## reminders

- id
- wedding_id
- title
- reminder_date
- completed

---

# 6. Backend Architecture

```
Routes
    ↓
Validation
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

---

# 7. Folder Structure

```
server

src/

controllers/
services/
repositories/
routes/
middleware/
validators/
config/
utils/

```

---

# 8. API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/profile

---

## Wedding

GET /api/weddings

GET /api/weddings/:id

POST /api/weddings

PUT /api/weddings/:id

DELETE /api/weddings/:id

---

## Checklist

GET /api/checklists

GET /api/checklists/:id

POST /api/checklists

PUT /api/checklists/:id

DELETE /api/checklists/:id

---

## Guests

GET /api/guests

GET /api/guests/:id

POST /api/guests

PUT /api/guests/:id

DELETE /api/guests/:id

---

## Vendors

GET /api/vendors

GET /api/vendors/:id

POST /api/vendors

PUT /api/vendors/:id

DELETE /api/vendors/:id

---

## Expenses

GET /api/expenses

POST /api/expenses

PUT /api/expenses/:id

DELETE /api/expenses/:id

---

## Payments

GET /api/payments

POST /api/payments

PUT /api/payments/:id

DELETE /api/payments/:id

---

## Documents

GET /api/documents

POST /api/documents

DELETE /api/documents/:id

---

## Reminders

GET /api/reminders

POST /api/reminders

PUT /api/reminders/:id

DELETE /api/reminders/:id

---

# 9. Business Rules

- Every user owns only one wedding.
- Every wedding belongs to exactly one user.
- Checklist, guests, vendors, expenses, reminders, documents belong to one wedding.
- Expenses may contain multiple payments.
- Users can only access their own data.
- Soft delete for users only.
- JWT required for all protected routes.

---

# 10. Validation

Register

- Required fields
- Unique email
- Password >= 8 characters

Wedding

- Wedding date cannot be in the past

Checklist

- Task required
- Status must be Pending, In Progress, or Completed

Expense

- Amount must be positive

Guest

- Phone number optional

Vendor

- Category required

---

# 11. Frontend Pages

Authentication

- Login
- Register

Dashboard

- Overview

Wedding

- Wedding Profile

Checklist

- Checklist List
- Add Checklist
- Edit Checklist

Guests

- Guest List

Vendors

- Vendor List

Expenses

- Expense List

Payments

- Payment History

Documents

- Upload Documents

Reminders

- Reminder List

Profile

- User Profile

---

# 12. Dashboard Widgets

- Total Checklist
- Completed Checklist
- Remaining Tasks
- Guest Count
- Vendor Count
- Total Budget
- Total Expenses
- Remaining Budget
- Upcoming Reminders

---

# 13. Future Features

- Email reminders
- Calendar integration
- PDF report
- Wedding timeline
- Vendor ratings
- Mobile responsive improvements
- Dark mode

---

# 14. Coding Standards

- Controller only handles HTTP requests and responses.
- Service contains business logic.
- Repository contains SQL queries only.
- Validation is handled by middleware.
- Never write SQL inside controllers.
- Never hash passwords inside repositories.
- Keep functions small and focused.
- Use async/await consistently.
- Return JSON responses in a consistent format.

Example Response

Success

{
    "success": true,
    "data": {}
}

Error

{
    "success": false,
    "message": "Something went wrong."
}