-- ==========================================
-- Wedding Management Database Schema
-- ==========================================

DROP TABLE IF EXISTS wedding_collaborators CASCADE;
DROP TABLE IF EXISTS wedding_invitations CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS reminders CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS checklist CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS weddings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE weddings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,

    partner_name VARCHAR(100) NOT NULL,
    wedding_date DATE NOT NULL,
    budget DECIMAL(12,2) DEFAULT 0,
    location VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE checklist (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    due_date DATE,

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Completed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);

CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    vendor_id INT NOT NULL,

    amount DECIMAL(12,2) NOT NULL,
    due_date DATE,
    paid_at TIMESTAMP,

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Paid')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(vendor_id)
        REFERENCES vendors(id)
        ON DELETE CASCADE
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    category VARCHAR(100),
    amount DECIMAL(12,2) NOT NULL,
    expense_date DATE NOT NULL,
    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);

CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Confirmed','Declined')),

    table_no INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Submitted','Approved')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);

CREATE TABLE wedding_collaborators (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(wedding_id, user_id)
);

CREATE TABLE wedding_invitations (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    invited_by INT NOT NULL REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending'
        CHECK(status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,
    due_date TIMESTAMP NOT NULL,

    status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Completed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    FOREIGN KEY(wedding_id)
        REFERENCES weddings(id)
        ON DELETE CASCADE
);