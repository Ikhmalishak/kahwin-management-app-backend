# Wedding Checklist Backend — Agent Guide

## Quick start

```bash
npm install
# Requires PostgreSQL running on localhost:5432 with DB_USER/DB_PASSWORD from .env
psql -U admin_ikhmal -d kahwin_management -f sql/schema.sql
psql -U admin_ikhmal -d kahwin_management -f sql/seed.sql   # optional
npm run dev       # nodemon, auto-restart on change
npm start         # node only
npm test          # jest --verbose; NODE_ENV=test set automatically
```

## Architecture (4-layer, strict separation)

```
routes/ -> validators/ -> controllers/ -> services/ -> repositories/ -> PostgreSQL
```

- **Routes** — mount paths, wire middleware/validators/controllers. `routes/vendor.routes.js` and `routes/document.routes.js` exist but are NOT wired in `app.js`. Add them if needed.
- **Validators** — Zod schemas, used via `middlewares/validation.middleware.js` (`validate(schema)`).
- **Controllers** — HTTP only: parse `req`, call service, return JSON. Response shape: `{ success: bool, data?: ..., message?: string }`.
- **Services** — business logic, verify wedding ownership, call repos. Never write raw SQL here (except `verifyWeddingOwnership` uses inline queries).
- **Repositories** — SQL queries only. Never hash passwords or do business logic here.

All routes (`auth`, `weddings`, `checklists`, `expenses`, `payments`, `reminders`, `guests`, `vendors`, `documents`) are wired in `app.js`.

## Key facts

- **Express 5** — `app.listen()` is conditional: server starts only when `NODE_ENV !== 'test'`. Tests call `.listen()` explicitly.
- **JWT auth** via `Bearer` header. Token payload: `{ userId, email }`. Expires in 7d. Secret from `SECRET_KEY` env var.
- **PostgreSQL `pg` Pool** — exported from `config/db.js`. Pool config sourced from `.env` (loaded by `dotenv` in `db.js`).
- **Soft deletes** — all repos use `UPDATE ... SET deleted_at = NOW()` and filter with `AND deleted_at IS NULL` on selects.
- **Tests require a live DB** — `test` env reads same `.env` DB config. Tests clean up after themselves (`DELETE FROM users WHERE email = ...`).
- **Guest, vendor, and document** full CRUD with soft deletes are now implemented.
- **Inconsistent auth-on-routes** — `auth.routes.js` mounts without `authenticate` middleware; all other routes mount `authenticate` in `app.js`. But `wedding.routes.js` also uses `authorize(['admin'])` inline, creating double auth checks.
- **`utils/` directory is empty** — no shared helpers exist yet.
- **`requirement.md`** is a design spec, not a living docs file. Code may diverge (e.g., DB schema uses `venue` field but schema.sql uses `location`; `guests` table in spec has `invitation_status` but schema has `status` with different enum).

## Testing quirks

- Tests use `supertest` against the app export. `auth.test.js` calls `.listen()` on import; `checklist.test.js` does not.
- Checklist tests are order-dependent (create -> list -> update -> delete on the same item).
- Register endpoint returns `201` with flat `{ id, name, email, role, token }` (no `success` wrapper), not the standard `{ success, data }` shape.
- Test script sets `NODE_ENV=test` before jest.