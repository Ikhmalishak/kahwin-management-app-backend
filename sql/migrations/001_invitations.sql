CREATE TABLE IF NOT EXISTS wedding_collaborators (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(wedding_id, user_id)
);

CREATE TABLE IF NOT EXISTS wedding_invitations (
    id SERIAL PRIMARY KEY,
    wedding_id INT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    invited_by INT NOT NULL REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending'
        CHECK(status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
