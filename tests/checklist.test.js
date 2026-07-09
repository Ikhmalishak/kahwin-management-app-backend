const request = require('supertest');
const app = require('../app');
const pool = require('../config/db');

describe('Checklist Management', () => {
  let authToken;
  let weddingId;
  let checklistId;

  beforeAll(async () => {
    // Create test user and get token
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Checklist User',
        email: 'checklist@test.com',
        password: 'Test@1234'
      });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'checklist@test.com',
        password: 'Test@1234'
      });
    
    authToken = loginRes.body.token;

    // Create test wedding
    const weddingRes = await request(app)
      .post('/api/weddings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        partner_name: 'Test Partner',
        wedding_date: '2027-06-12',
        budget: 50000
      });
    
    weddingId = weddingRes.body.id;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', ['checklist@test.com']);
    await pool.end();
  });

  test('POST /api/checklists - should create a new checklist item', async () => {
    const res = await request(app)
      .post('/api/checklists')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        wedding_id: weddingId,
        title: 'Book Venue',
        category: 'Venue'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('id');
    checklistId = res.body.data.id;
  });

  test('GET /api/checklists - should retrieve checklist items', async () => {
    const res = await request(app)
      .get('/api/checklists')
      .set('Authorization', `Bearer ${authToken}`)
      .query({ weddingId });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('PUT /api/checklists/:id - should update checklist status', async () => {
    const res = await request(app)
      .put(`/api/checklists/${checklistId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ status: 'In Progress' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.status).toBe('In Progress');
  });

  test('DELETE /api/checklists/:id - should delete checklist item', async () => {
    const res = await request(app)
      .delete(`/api/checklists/${checklistId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});